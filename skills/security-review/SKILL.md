---
name: security-review
description: Perform a security-focused code review of smart contracts, frontends, backends, and mobile apps. Use this skill for a security review, audit, vulnerability scan, or check of code for security issues, including reviewing a pull request, diff, or changed files, or asking "is this safe to merge or ship." Covers Solidity and ErgoScript smart contracts (reentrancy, access control, oracle manipulation, box and register validation); Next.js, Tailwind, and Svelte frontends (XSS, SSRF, exposed secrets, CSRF, insecure API routes); Python and Go backends (injection, unsafe deserialization, unsafe concurrency, weak randomness); and Flutter mobile apps (insecure storage, hardcoded secrets, missing certificate pinning, insecure WebViews). Also covers general classes such as injection, auth flaws, cryptography issues, unsafe deserialization, and data exposure. Use whenever code touches funds, user data, or authentication, even without the word "security."
compatibility: Works in any coding agent with file read/write and search access. Git commands are used to scope diffs/PRs and to stamp the report with a commit hash. Saves its report to unremediated-security-reviews/ in the project.
metadata:
  version: "1.0"
  category: security
allowed-tools: Read Grep Glob Write Edit Bash(git diff:*) Bash(git status:*) Bash(git log:*) Bash(git show:*) Bash(git rev-parse:*) Bash(git remote show:*) Bash(date:*) Bash(mkdir:*)
user-invocable: true
---

# Security Review

## Purpose

This skill guides a security-focused code review. It finds high-confidence
vulnerabilities. It does not replace a full manual audit or a penetration test.
Tell the user this limit when you report results.

This skill is the first half of a two-part workflow. Once findings here are
fixed (or explicitly accepted), the companion **security-remediation** skill
reads the report this skill produces, matches remediating commits, and
publishes a closeout report. Nothing here depends on that skill running — a
report saved by this skill is a complete, standalone artifact — but write the
report in the format below so that skill can parse it later.

## Step 1: Set the Scope

Determine what to review. Use this order:

1. If the user names files, a directory, or a pull request, review that scope.
2. If the user asks to review "this PR," "my changes," or "the diff," and the
   project uses git, review the diff against the base branch.
3. If the user gives no scope and the project is a git repository with pending
   changes, review the diff of those changes.
4. If none of the above apply, ask the user what to review. Offer the current
   diff, a specific path, or the full repository as options.

State which scope you used at the top of your report.

**Diff or PR scope:** Report only vulnerabilities introduced or made worse by
the change. Do not report pre-existing issues that the diff does not touch.

**File, directory, or full-repository scope:** Report all vulnerabilities you
find, not only new ones.

## Step 2: Detect the Project Type

Check for these signals. A project can match more than one type. Apply every
checklist that matches, plus the general checklist, which applies to all
projects.

| Signal | Project type |
|---|---|
| `*.sol` files, `foundry.toml`, `hardhat.config.js`, `truffle-config.js`, `remappings.txt` | Smart contract (Solidity) |
| `*.es` files, ErgoScript embedded as strings alongside `ergo-appkit`, `sigmastate`, `ergo-lib`, or `fleet-sdk` dependencies | Smart contract (ErgoScript) |
| `next.config.js`, `next` listed in `package.json`, `tailwind.config.js`, widespread `.tsx`/`.jsx` files | Frontend (Next.js / Tailwind) |
| `*.svelte` files, `svelte.config.js`, `svelte` or `@sveltejs/kit` listed in `package.json` | Frontend (Svelte / SvelteKit) |
| `*.py` files, `requirements.txt`, `pyproject.toml`, `Pipfile`, `manage.py`, `wsgi.py` | Backend (Python) |
| `*.go` files, `go.mod`, `go.sum` | Backend (Go) |
| `pubspec.yaml`, `lib/*.dart` files, `android/` and `ios/` directories | Mobile app (Flutter) |

If none of these signals appear, apply only the general checklist.

## Step 3: Gather Context

Before you judge any single line, understand the codebase.

1. Run `git status` first. For diff or PR scope, identify the base ref (the
   branch or commit the change is against) and read the actual scoped diff
   with `git diff <base>...HEAD` (three-dot: everything on this branch
   since it diverged from base) — plain `git diff` alone only shows
   uncommitted working-tree changes and misses committed PR commits
   entirely. Inspect staged and unstaged local changes separately with
   `git diff --cached` and `git diff` when those are also in scope. Use
   `git diff --name-only` and `git log` to list the affected files and
   commits.
2. Search the codebase for existing security patterns: input validation
   helpers, authentication middleware, sanitization functions.
3. Identify the project's trust boundaries. Example: in a web app, the
   boundary is the server; in a smart contract, the boundary is the
   transaction; in a mobile app, the boundary is the device and the network.
4. Note the frameworks and libraries in use. Their built-in protections
   change what counts as a real vulnerability. See the notes under each
   checklist below.

## Step 4: Apply the Vulnerability Checklists

Work through every checklist that matches the detected project type.
For each finding, trace the data flow from the untrusted input to the
sensitive operation before you report it.

### General Checklist (all projects)

**Injection**
- SQL, NoSQL, LDAP, or command injection through unsanitized input.
- XML External Entity (XXE) injection in XML parsers.
- Template injection in templating engines.

**Authentication and authorization**
- Authentication bypass logic.
- Privilege escalation paths.
- Broken or predictable session tokens.
- JWT flaws: missing signature verification, `alg: none` accepted, weak
  signing secret.

**Cryptography and secrets**
- Hardcoded API keys, passwords, or tokens.
- Weak or outdated algorithms (MD5, SHA-1, DES, ECB mode).
- Predictable or insufficiently random values used for a security purpose.

**Deserialization and code execution**
- Unsafe deserialization: Python `pickle`, YAML `load` instead of
  `safe_load`, PHP `unserialize` on untrusted input.
- `eval` or other dynamic code execution on user-supplied input.

**Data exposure**
- Passwords, tokens, or personal data written to logs.
- Debug information or stack traces exposed to end users.
- Path traversal in file read or write operations.

### Smart Contract Checklist (Solidity)

**Reentrancy and external calls**
- State updated after an external call, instead of before it.
- Missing checks-effects-interactions pattern.
- Cross-function or cross-contract reentrancy through shared state.
- Unchecked return value from `.call()`, `.send()`, or `.transfer()`.
- Reentrancy through `receive()` or `fallback()`.

**Access control**
- Missing or incorrect owner or role check on a sensitive function.
- Use of `tx.origin` for authentication instead of `msg.sender`.
- Unprotected initializer function in an upgradeable contract.
- Missing access control on a function that mints tokens, withdraws funds,
  or changes a critical parameter.

**Arithmetic and logic**
- Integer overflow or underflow in Solidity below version 0.8.0, or inside
  an `unchecked` block.
- Rounding or precision loss in division that favors an attacker.
- Off-by-one errors in loops or array indexing.

**Oracles and external data**
- Price read from a single, easily manipulated source, such as one DEX
  pool's spot price.
- Flash loan attack that manipulates a price or balance inside one
  transaction.

**Upgradeability and proxies**
- Storage layout collision between a proxy and its implementation.
- Unprotected `delegatecall` to an untrusted or user-controlled address.
- Function selector clash in a proxy pattern.

**Denial of service**
- Unbounded loop over a user-controlled array.
- Logic that one failing external call, or one griefing deposit, can block
  permanently.

**Signatures and randomness**
- Signature replay across chains or contracts due to a missing chain ID or
  nonce.
- Use of `block.timestamp` or `blockhash` as a randomness source.

**Token standards**
- Missing check on an ERC-20 transfer's return value. Some tokens do not
  revert on failure.
- Accounting logic that breaks under fee-on-transfer or rebasing tokens.

*Notes for this checklist:*
- Gas optimization issues are not security findings. Do not report them here.
- An owner or admin key that can change parameters is a common, accepted
  design. Flag it only when it combines with a concrete exploit path, such
  as a missing timelock on a function that can drain user funds.
- Do not report findings that exist only in test files or mock contracts.

### Smart Contract Checklist (ErgoScript)

ErgoScript guards a box in Ergo's eUTXO model. It runs once, at spending
time. It has no persistent internal state and no callbacks. Do not apply
Solidity-style reentrancy checks here; that attack class does not exist in
this model.

**Box and value validation**
- Missing check that the total value or tokens of `OUTPUTS` account for
  everything required from `INPUTS`, allowing value to leak to an
  unintended output.
- Missing check on `OUTPUTS.size` or output order, allowing an attacker to
  add, remove, or reorder outputs to bypass a condition.
- Missing check that a token is forwarded to the correct output box.

**Register and data validation**
- Trusting a register (`R4`–`R9`) without checking it is present and has
  the expected type before use. Registers are optional.
- Missing validation of the box that supplies register data used as
  on-chain state, allowing spending from a forged box with manipulated
  data.

**Context extension variables**
- Using a context extension variable (`getVar`) inside the guard script
  without validating it, letting the spender supply an arbitrary value at
  spending time.

**Self-reference and state continuity**
- A stateful contract that does not check that `SELF` is correctly
  recreated in an output, allowing an attacker to break the state machine
  by not recreating the box, or recreating it with tampered data.

**Authorization**
- A `proveDlog` or `proveDHTuple` condition that does not actually bind to
  the value or box it is meant to protect.
- A sigma-proposition combined with `||` where `&&` was intended,
  unintentionally weakening a required condition.

**Time and height locks**
- A height-based timelock that checks the wrong box's creation height
  instead of the current `HEIGHT`.

**Notes for this checklist:**
- Do not report Solidity-style reentrancy, `delegatecall`, or upgradeable
  proxy findings against ErgoScript. The eUTXO execution model does not
  support them.
- Flag missing validation only when you can point to a specific output,
  register, or context variable an attacker could control.

### Frontend Checklist (Next.js / React / Tailwind)

**Cross-site scripting (XSS)**
- `dangerouslySetInnerHTML` used with unsanitized input.
- User input placed into a `<script>` tag, an `href`, or a `style`
  attribute without escaping.

**Server-side request forgery and injection**
- SSRF in an API route or Server Action that fetches a user-supplied URL.
- SQL, NoSQL, or command injection in an API route or Server Action.
- Template injection in server-rendered content.

**Authentication and authorization**
- Missing authentication or authorization check in an API route or Server
  Action.
- Session or JWT validation that trusts client-supplied data.
- Insecure direct object reference: an endpoint returns any user's data
  based on an ID in the request, without checking ownership.

**Secrets and configuration**
- A secret or API key placed in a `NEXT_PUBLIC_` environment variable.
  These variables ship to the browser.
- A secret exposed through `getStaticProps` output or another
  client-visible payload.

**Request handling**
- Missing CSRF protection on a state-changing request that relies on
  cookies for authentication.
- Open redirect using a user-supplied URL parameter.
- CORS configuration that allows any origin (`*`) on an endpoint that
  requires authentication.

**Other**
- Path traversal in an API route that reads a file based on user input.
- A `next/image` remote-patterns or domains configuration that allows
  arbitrary external hosts, enabling SSRF.
- Prototype pollution in code that merges a user-supplied object.

*Notes for this checklist:*
- React and Next.js escape rendered content by default. Do not report XSS
  in standard JSX rendering. Report it only when the code uses
  `dangerouslySetInnerHTML` or another method that inserts raw HTML.
- Client-side code is not a trust boundary. Do not report a missing
  permission check in client-side JavaScript alone. Check whether the
  server enforces the same check; if it does, this is not a finding.

### Frontend Checklist (Svelte / SvelteKit)

**Cross-site scripting (XSS)**
- `{@html ...}` used with unsanitized user input.
- User input bound to an `href`, `src`, or inline `style` attribute
  without validation, enabling a `javascript:` URL or CSS injection.

**Server code (SvelteKit)**
- Missing authentication or authorization check in a `+page.server.js`,
  `+server.js`, or form action.
- SSRF in a server `load` function or endpoint that fetches a
  user-supplied URL.
- SQL, NoSQL, or command injection in a SvelteKit server endpoint.

**Secrets and configuration**
- A secret placed in a `PUBLIC_`-prefixed environment variable. SvelteKit
  ships `PUBLIC_*` variables to the browser.
- A secret exposed through data a `load` function returns to the client
  without filtering.

**Request handling**
- Missing CSRF protection on a form action that relies on cookies for
  authentication.
- Open redirect using a user-supplied URL in `goto()` or a server-side
  redirect.

**Other**
- Insecure direct object reference: a server endpoint returns or modifies
  another user's data based on an ID in the request, without checking
  ownership.

*Notes for this checklist:*
- Svelte escapes `{expression}` text interpolation by default. Report XSS
  only when the code uses `{@html}` or another method that inserts raw
  HTML or attributes without sanitization.
- Client-side code, including Svelte stores and components, is not a
  trust boundary. Check whether the server enforces the same check before
  reporting a client-only finding.

### Mobile App Checklist (Flutter)

**Data storage**
- Sensitive data stored in `SharedPreferences` or a local file without
  encryption.
- An API key, token, or secret hardcoded in Dart source code.
- Sensitive data written to logs in a release build.

**Network communication**
- Missing certificate pinning on a connection that carries sensitive data.
- Use of `http` instead of `https` for a sensitive request.
- Disabled certificate validation, such as a custom `HttpClient` that
  accepts all certificates.

**Platform integration**
- Unvalidated input passed across a platform channel to native code.
- A WebView that enables JavaScript and loads an untrusted or
  user-controlled URL.
- A JavaScript bridge (for example, `addJavaScriptChannel`) exposed to
  untrusted web content.

**Authentication and session**
- Biometric authentication that the app accepts without confirming the
  result with the backend.
- A deep link that triggers a sensitive action without validating the
  link's source or parameters.

**Build configuration**
- Debug flags, verbose logging, or debug endpoints enabled in a release
  build.

*Notes for this checklist:*
- A rooted or jailbroken device defeats most client-side protections. Do
  not report missing root or jailbreak detection as a standalone finding.
  Report it only when the app handles payments, credentials, or regulated
  data, and has no server-side control as a backup.
- Missing code obfuscation is a hardening gap, not a vulnerability by
  itself. Report it only alongside a concrete secondary issue.

### Backend Checklist (Python)

**Injection**
- SQL injection via a string-formatted or concatenated query, instead of
  a parameterized query or an ORM's parameter binding.
- Command injection via `os.system`, `subprocess` with `shell=True`, or
  `os.popen` on unsanitized input.
- Server-side template injection: `render_template_string` (Flask) or a
  similar function called with user input as the template itself.

**Deserialization and code execution**
- `pickle.loads` or `yaml.load` (instead of `yaml.safe_load`) on
  untrusted data.
- `eval` or `exec` on a user-supplied string.

**Framework-specific (Django / Flask / FastAPI)**
- `mark_safe()` or the `|safe` template filter applied to unsanitized
  user input.
- Django's CSRF middleware disabled, or a view decorated with
  `@csrf_exempt` that handles a state-changing request.
- `app.run(debug=True)` in Flask, or `DEBUG = True` in Django settings,
  left enabled for a production configuration. The interactive debugger
  this exposes allows remote code execution.
- A FastAPI or Django REST Framework endpoint missing its authentication
  dependency or permission class on a route that returns or changes
  sensitive data.

**File and path handling**
- Path traversal via an unsanitized filename passed to `open()`,
  `send_file()`, or a similar function.
- Zip-slip: extracting a `zipfile` or `tarfile` archive without checking
  that each member path stays inside the target directory.

**Secrets and configuration**
- A hardcoded `SECRET_KEY`, database credential, or API key in source
  code.

*Notes for this checklist:*
- Django and Flask templates autoescape by default. Report XSS only when
  autoescape is disabled, or `safe`/`|safe`/`mark_safe` is used on
  unsanitized input.
- Do not report missing type hints or style issues. These are not
  security findings.

### Backend Checklist (Go)

**Injection**
- SQL injection via a concatenated query string, instead of `database/sql`
  placeholders or an ORM's parameter binding.
- Command injection via `os/exec.Command` built from unsanitized input,
  especially when run through a shell.

**Concurrency**
- A data race on state that a security decision depends on (for example,
  an authorization check), when the state is shared across goroutines
  without a mutex or channel.
- Unbounded goroutine creation driven by unauthenticated input. Report
  only when it meets the severe-impact bar defined in the General
  exclusions (Step 5) — not routine resource exhaustion below that bar.

**Error handling**
- An ignored error return value on a security-relevant operation, such as
  signature verification, authentication, or TLS setup.

**Web frameworks (net/http, Gin, Echo)**
- Missing authentication or authorization middleware on a route that
  touches sensitive data.
- Path traversal via unsanitized input passed to `http.ServeFile` or a
  similar file-serving function.
- Open redirect via an unsanitized `Location` header built from user
  input.

**Cryptography**
- `math/rand` used instead of `crypto/rand` for a token, session ID, or
  other security-relevant random value.
- `InsecureSkipVerify: true` on an HTTP client used for a sensitive
  connection.

**Secrets and configuration**
- A hardcoded API key, database credential, or signing key in source
  code.

*Notes for this checklist:*
- Flag an ignored error only when it affects an authentication,
  authorization, or cryptographic operation. Most ignored errors are not
  security findings.
- Go is memory-safe. Do not report buffer overflow or use-after-free
  findings.

## Step 5: Filter False Positives

Remove a finding if it matches any exclusion below. These exclusions keep
the report high-signal.

**Separating Notes from Findings.** Some patterns are real, and you traced
them all the way to a concrete effect — but that effect is a deliberate,
documented design choice rather than an oversight. Example: an endpoint
returns data looked up by a public identifier with no ownership check,
and the project's own docs state that confidentiality is intentionally
handled elsewhere (e.g., client-side encryption). Do not drop this
silently, and do not report it as a Finding either — move it to the
**Notes** section (see Step 7) instead. The test: would fixing this
contradict the project's stated design? If yes, it is a Note. If the
"design" is just an assumption you're making because you found no
counter-evidence, treat it as a Finding instead and say so in the
description.

This is different from the exclusions below, which are patterns you drop
entirely because they carry no real risk or fall outside this skill's
scope — those get no mention in the report at all.

**General exclusions**
- Denial of service from resource exhaustion or rate limiting, unless it
  can permanently lock funds, permanently disable a contract, or cause a
  severe backend outage. "Severe" here means: a single unauthenticated
  request, or a small fixed number of them, crashes the process, exhausts
  memory, or makes the service unresponsive to other users until it is
  manually restarted.
- A secret stored on disk that is already protected by OS file permissions
  or a secrets manager.
- A missing best practice with no concrete exploit path. Code does not need
  to implement every hardening measure.
- A finding that exists only in a test file, a mock, or fixture data.
- An outdated third-party library version. Report this as a dependency
  update instead, unless you confirm a specific, exploitable code path.
- A memory safety issue in a memory-safe language, such as Rust, Dart,
  Go, Python, JavaScript, or TypeScript.
- A race condition that is theoretical rather than concretely triggerable.
- A missing audit log. This is a hardening gap, not a vulnerability.
- A missing authorization check in client-side code, when the same check
  is enforced on the server.

**Confidence threshold**
Assign each remaining finding a confidence score from 0.0 to 1.0:

- 0.9–1.0: Confirmed exploit path.
- 0.8–0.9: Clear vulnerability pattern with a known exploitation method.
- 0.7–0.8: Suspicious pattern that needs specific conditions to trigger.
- Below 0.7: Do not report. The finding is too speculative.

Report only findings with confidence 0.7 or higher.

## Step 6: Assign Severity

- **Critical:** Directly exploitable. Leads to loss of funds, full account
  takeover, or remote code execution.
- **High:** Exploitable vulnerability. Leads to unauthorized access, a data
  breach, or a significant risk of fund loss.
- **Medium:** Exploitable only under specific conditions, but with real
  impact.
- **Low:** A defense-in-depth issue with limited impact.

## Step 7: Write the Report

### Report Metadata

Before the introductory paragraph, output a short metadata block:

- **Reviewing agent / model:** the name and version of the model or agent
  performing this review, exactly as it identifies itself (for example,
  "Claude Sonnet 5", "GPT-4.1", "local Llama 3 70B"). If the runtime does
  not expose this information, state "not disclosed by the runtime." Do
  not guess a model name.
- **Reasoning effort / tier:** the effort level, thinking budget, or model
  tier in use, if the runtime exposes one (for example, "high", "extended
  thinking", "default"). State "not applicable" if the runtime has no such
  setting.
- **Review date and time:** the current date and time in ISO 8601 format,
  from the system clock (for example via `date -u`), with the timezone
  stated or UTC used. Do not use a training-data date; use the actual
  clock at review time.

This metadata matters because different models, versions, and effort
levels catch different subsets of vulnerabilities — a reader comparing
two reports needs to know what actually produced each one. This skill is
not specific to any one model; fill in the block accurately for whatever
agent is running it.

### Report Structure

The report has four top-level sections, in this order: **Scope**,
**Findings**, **Notes**, **Limitations**. Use this outline (heading levels
matter — the security-remediation skill parses on them):

```markdown
# Security Review Report

<metadata block>

## Scope

<the introductory paragraph described below>

## Findings

### Finding 1: <short title> — `<file>:<line>`
...

## Notes

### Note 1: <short title> — `<file>:<line>`
...

## Limitations

<standing + review-specific limitations>
```

### Scope

State the scope you reviewed (diff, PR, files, directory, or full
repository), the project types you detected, and the commit hash of the
reviewed code. Get the commit hash with `git rev-parse HEAD` (or
`git rev-parse <ref>` if the scope is a specific commit or branch). If the
code is not in a git repository, state that no commit hash is available.

### Findings

Output one entry per finding. Use this format:

```markdown
### Finding <number>: <short title> — `<file>:<line>`

- Severity: <Critical | High | Medium | Low>
- Confidence: <0.0-1.0>
- Category: <e.g. reentrancy, xss, access_control, insecure_storage>
- Description: <what the vulnerability is and why it is exploitable>
- Exploit Scenario: <a concrete attack path an attacker could follow>
- Recommendation: <a specific code-level fix>
```

Example:

```markdown
## Findings

### Finding 1: Reentrancy in withdraw() — `Vault.sol:88`

- Severity: Critical
- Confidence: 0.95
- Category: reentrancy
- Description: withdraw() sends ETH via a low-level call before it updates
  the caller's balance. A malicious contract can re-enter withdraw() from
  its receive() function and drain the vault.
- Exploit Scenario: An attacker deploys a contract whose receive() function
  calls withdraw() again. Each re-entry withdraws the same balance before
  it is zeroed, draining the vault in one transaction.
- Recommendation: Update the caller's balance to zero before sending ETH,
  or add a reentrancy guard such as OpenZeppelin's ReentrancyGuard.
```

If you find no issues that clear the confidence threshold, state that
clearly. Do not invent a finding to fill the report.

### Notes

Output one entry per note (see Step 5, "Separating Notes from Findings").
Use this format:

```markdown
### Note <number>: <short title> — `<file>:<line>`

- Category: <e.g. design-tradeoff, accepted-risk>
- Observation: <the pattern you traced and what it lets happen>
- Rationale: <why this is a deliberate, documented design choice, citing
  the doc, comment, or code that establishes intent>
```

If there are no notes for this review, state that clearly rather than
omitting the section header.

### Limitations

Close every report with a **Limitations** section. Include both parts
below every time — do not omit this section or shorten it to a single
line.

**Standing limitations** (state these every time, regardless of which
model or agent ran the review):

- This review does not replace a full manual audit or a penetration test.
- This is static analysis of source text. Nothing was executed, fuzzed,
  or traced at runtime, so timing-dependent, load-dependent, or
  infrastructure-dependent issues cannot be confirmed here.
- Confidence scores are the reviewing model's own self-assessment, not a
  calibrated statistical probability.
- Absence of a reported finding does not mean the code is secure. Safety
  guardrails built into some models can cause a real vulnerability to be
  softened, generalized, or left out rather than reported in exploit-level
  detail, and training-data bias can make some vulnerability classes
  easier for a model to recognize than others. Treat this report as a
  floor on what a full audit would find, not a ceiling.
- Findings reflect the reviewing model's training data cutoff. A
  vulnerability tied to a very recently disclosed CVE or library advisory
  may not be recognized as such.

**Review-specific limitations** (state only what actually applied to
*this* review; do not pad with hypotheticals):

- Name any file, section, or dependency you could not fully review
  because it did not fit in context, was unavailable, or was out of
  scope.
- Name any finding where you held back exploit-level detail, or reported
  a weaker version of a finding than the evidence supported, because of a
  content restriction — say which finding and what was held back.
- Name any checklist item you could not evaluate because required context
  (a dependency's source, a config file, an on-chain contract, external
  state) was unavailable to you.

If none of these review-specific cases apply, write: "No review-specific
limitations beyond the standing ones above."

## Step 8: Save the Report

Save the report as a file in the project — do not just print it in the
conversation. This lets the security-remediation skill find it later, and
keeps unfixed findings out of the public repository in the meantime.

1. Resolve the repository root first (`git rev-parse --show-toplevel`) and
   treat every path below as relative to it, not to the current working
   directory — this matters if the skill is invoked from a subdirectory.
2. Take the **Review date and time** from the metadata block (e.g.
   `2026-09-22T14:03:00Z`) and sanitize it for use in a filename by
   replacing every `:` with `-` (colons are illegal in Windows filenames):
   `2026-09-22T14-03-00Z`. Keep the original, colon-containing form in the
   report's metadata text — only the filename is sanitized.
3. The filename is `sec_review_<sanitized-timestamp>_<short-commit>.md`,
   where `<short-commit>` is the first 7 characters of the commit hash
   from the Scope section (or `nogit` if none is available). Before
   writing, check whether a file already exists at that exact path (e.g.
   two reviews of the same commit started in the same second) — if it
   does, append `_2`, `_3`, etc. before `.md` until the path is free.
   Never overwrite an existing report.
4. The report is saved to `unremediated-security-reviews/<filename>` at
   the repository root. Create the directory if it does not exist.
5. Before writing the report, check whether the project has a `.gitignore`
   file and whether it already ignores `unremediated-security-reviews/`
   (an exact entry, or a broader pattern that would already cover it).
   If not covered, add a `unremediated-security-reviews/` line to
   `.gitignore` (creating the file at the repo root if none exists). This
   folder holds unremediated findings and must never be committed to a
   public repository — do not skip this check.
6. Write the report to that path.
7. Tell the user the saved path, and that the folder is untracked and
   excluded from Git — not private. Git exclusion keeps the report out of
   commits and pushes; it does nothing to stop local users, backups, or
   other tools on the machine from reading the file. If real
   confidentiality is required, that needs filesystem-level access
   controls, which this skill does not set up. Mention that running the
   security-remediation skill afterward will match remediating commits,
   ask about any findings left open, and publish both the review and a
   remediation report to `security-reviews/` (a tracked, public folder).

If the project is not a git repository (no `.gitignore` conventions
apply) or the user has already told you to just print the report, skip
this step and say so.

## Operating Rules

- Use read-only tools for the review itself — `Read`, `Grep`, `Glob`, and
  non-mutating git commands. Do not run untrusted code from the reviewed
  repository.
- Do not modify reviewed source code. The only writes this skill makes
  are the two described in Step 8: creating the report file under
  `unremediated-security-reviews/`, and adding that folder to `.gitignore`
  if it is missing. If the user separately asks you to fix a finding,
  treat that as a new, explicit request.
- If you are unsure whether a pattern is exploitable, say so in the
  description instead of omitting the finding or overstating it.
