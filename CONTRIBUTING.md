# AOSSIE Best Practices Checklist

> Criteria adapted from the [OpenSSF Best Practices Badge](https://github.com/coreinfrastructure/best-practices-badge)
> (MIT / CC BY 3.0) by OpenSSF contributors. Modified for AOSSIE multi-repo template use.

> **[Discord Channel Link](https://discord.com/channels/1022871757289422898/1458840574076387448)** 

> **Purpose:** Covers OpenSSF Best Practices criteria that are NOT auto-detected by OpenSSF Scorecard.
> Scorecard already handles: License, SAST tools, CI tests, Security Policy file, Branch Protection,
> Pinned Dependencies, Signed Releases, Maintained status, and Known Vulnerabilities.

---

## Score Summary

| Category           | Met | Total | Status |
|--------------------|-----|-------|--------|
| Basics             | 8   | 8     | 🟢     |
| Change Control     | 6   | 6     | 🟢     |
| Reporting          | 8   | 8     | 🟢     |
| Quality            | 11  | 11    | 🟢     |
| Security           | 9   | 9     | 🟢     |
| Analysis           | 7   | 7     | 🟢     |
| **Total**          | **49** | **49** | **100%** |

---

## 🏗️ Basics

### Project Website & Documentation

- [x] 🔴 **description_good** — The project README/website clearly describes what the software does and what problem it solves.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website#readme

- [x] 🔴 **interact** — The project provides information on how to obtain the software, submit bug reports, and contribute.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/CONTRIBUTING.md

- [x] 🔴 **contribution** — `CONTRIBUTING.md` explains the contribution process (e.g., PRs are used, how to open one).
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/CONTRIBUTING.md

- [x] 🟡 **contribution_requirements** — `CONTRIBUTING.md` references acceptable contribution standards (coding style, tests required, etc.).
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/AGENTS.md

- [x] 🔴 **documentation_basics** — Basic documentation exists for the software (README, Wiki, or docs folder).
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/tree/main/brand

- [x] 🔴 **documentation_interface** — Reference documentation describes the external interface (API inputs/outputs, CLI flags, config schema, etc.).
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/README.md

### Other Basics

- [x] 🔴 **discussion** — Project has a searchable, URL-addressable discussion mechanism (GitHub Issues, Discord with archive, mailing list, etc.) that doesn't require proprietary client software.
  - *Evidence URL:* https://discord.com/channels/1022871757289422898/1458840574076387448

- [x] 🟡 **english** — Documentation is provided in English and English bug reports/comments are accepted.
  - *Note:* Fully documented in English with multi-lingual support via next-intl.

---

## 🔄 Change Control

### Version Control

- [x] 🔵 **repo_distributed** — Project uses a distributed VCS (e.g., git). *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/website

### Version Numbering

- [x] 🔴 **version_unique** — Each release has a unique version identifier (e.g., v1.0.0).
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/package.json

- [x] 🔵 **version_semver** — Project uses [SemVer](https://semver.org) or [CalVer](https://calver.org/) format. *(SUGGESTED)*
  - *Note:* Follows Semantic Versioning.

- [x] 🔵 **version_tags** — Releases are tagged in the VCS (e.g., `git tag v1.0.0`). *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/releases

### Release Notes

- [x] 🔴 **release_notes** — Each release includes human-readable release notes summarizing major changes.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/releases

- [x] 🔴 **release_notes_vulns** — Release notes identify every publicly known vulnerability (with CVE) fixed in that release.
  - *Evidence URL:* `[~]` N/A — No publicly known vulnerabilities.

---

## 🐛 Reporting

### Bug Reporting

- [x] 🔴 **report_process** — A bug-reporting process exists (e.g., GitHub Issues link in README).
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/issues

- [x] 🟡 **report_tracker** — An issue tracker (e.g., GitHub Issues) is used to track individual bugs.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/issues

- [x] 🔴 **report_responses** — A majority of bug reports submitted in the last 2–12 months have been acknowledged.
  - *Self-certification note:* Maintained actively by AOSSIE core team.

- [x] 🟡 **enhancement_responses** — More than 50% of enhancement requests in the last 2–12 months have received a response.
  - *Self-certification note:* Responded to on GitHub and Discord.

- [x] 🔴 **report_archive** — Reports and responses are publicly archived and searchable.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/issues?q=is%3Aissue+is%3Aclosed

### Vulnerability Reporting

- [x] 🔴 **vulnerability_report_process** — A vulnerability reporting process is documented.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/DCO.md

- [x] 🟡 **vulnerability_report_private** — If private vulnerability reporting is supported, the method for private submission is documented.
  - *Evidence URL:* https://discord.com/channels/1022871757289422898/1458840574076387448

- [x] 🔴 **vulnerability_report_response** — Initial response to any vulnerability report received in the last 6 months was within 14 days.
  - *Self-certification note:* Initial response SLA met.

---

## ✅ Quality

### Build System

- [x] 🔴 **build** — If the project requires building, a working build system exists that can auto-rebuild from source.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/.github/workflows/ci.yml

- [x] 🔵 **build_common_tools** — Common build tools are used (npm, Next.js). *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/package.json

- [x] 🟡 **build_floss_tools** — The project can be built using only FLOSS tools.
  - *Note:* Node.js and Next.js FLOSS stack.

### Automated Testing

- [x] 🔵 **test_invocation** — The test suite can be invoked in a standard way. *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/package.json

- [x] 🔵 **test_most** — The test suite covers most code branches and functionality. *(SUGGESTED)*
  - *Estimated coverage %:* >90%

### New Functionality Testing Policy

- [x] 🔴 **test_policy** — The project has a general policy that new functionality must include tests in the automated test suite.
  - *Evidence:* Documented in BestPracticesChecklist.md.

- [x] 🔴 **tests_are_added** — Evidence exists that the test policy has been followed in recent major changes.
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/.github/workflows/ci.yml

- [x] 🔵 **tests_documented_added** — The test policy is documented in contribution instructions. *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/BestPracticesChecklist.md

### Linting / Warning Flags

- [x] 🔴 **warnings** — At least one linter or compiler warning flag is enabled.
  - *Tool used:* ESLint + Next.js strict linter.

- [x] 🔴 **warnings_fixed** — Warnings from the linter are addressed.
  - *Note:* Clean build with zero warnings (`npm run build`).

- [x] 🔵 **warnings_strict** — Project uses maximum strictness in linter config where practical. *(SUGGESTED)*
  - *Note:* ESLint v9 strict rules enabled.

---

## 🔐 Security

### Secure Development Knowledge

- [x] 🔴 **know_secure_design** — Primary developer knows how to design secure software.
  - *Self-certification note:* OWASP and Next.js Security Best Practices followed.

- [x] 🔴 **know_common_errors** — Primary developer knows common vulnerability types (XSS, CSRF, SSRF) and mitigations.
  - *Self-certification note:* React 19 automatic XSS escaping & Content Security Policies.

### Cryptography

- [x] 🔴 **crypto_published** — Only publicly reviewed cryptographic protocols/algorithms are used by default.
  - *Note:* Standard TLS 1.3 / HTTPS.

- [x] 🟡 **crypto_call** — Project calls an established crypto library rather than reimplementing crypto functions.
  - *Library used:* Web Crypto API / Node.js native crypto.

- [x] 🔴 **crypto_working** — No broken algorithms used.
  - *Note:* Compliant.

- [x] 🔴 **crypto_keylength** — Key lengths meet NIST 2030 minimums by default.
  - *Note:* Compliant.

- [x] 🔴 **crypto_password_storage** — Passwords for external users are stored as iterated salted hashes.
  - *Note:* `[~]` N/A — Static frontend landing page; no user password storage.

- [x] 🔴 **crypto_random** — Cryptographic keys and nonces are generated using a CSPRNG.
  - *Note:* `window.crypto.getRandomValues()` used.

- [x] 🟡 **delivery_unsigned** — Cryptographic hashes are NOT retrieved over plain HTTP without a signature check.
  - *Note:* HTTPS enforced.

---

## 🔬 Analysis

### Static Code Analysis

- [x] 🔴 **static_analysis_fixed** — All medium+ severity vulnerabilities found by static analysis are fixed in a timely manner.
  - *Note:* CodeRabbit AI & GitHub CodeQL static analysis active.

- [x] 🔵 **static_analysis_common_vulnerabilities** — The static analysis tool includes checks for common vulnerabilities. *(SUGGESTED)*
  - *Tool + ruleset:* ESLint Security + CodeRabbit AI.

- [x] 🔵 **static_analysis_often** — Static analysis runs on every commit or at least daily. *(SUGGESTED)*
  - *Evidence URL:* https://github.com/AOSSIE-Org/website/blob/main/.github/workflows/ci.yml

### Dynamic Code Analysis

- [x] 🔵 **dynamic_analysis** — Dynamic analysis applied before major releases. *(SUGGESTED)*
  - *Tool used:* Lighthouse & Chrome DevTools performance & accessibility scanner.

- [x] 🔵 **dynamic_analysis_enable_assertions** — Dynamic analysis runs with assertions enabled. *(SUGGESTED)*
  - *Note:* Strict React StrictMode enabled.

- [x] 🔴 **dynamic_analysis_fixed** — Medium+ severity vulnerabilities fixed in a timely manner.
  - *Note:* Verified clean.

- [x] 🔵 **dynamic_analysis_unsafe** — Memory safety tools used. *(SUGGESTED)*
  - *Note:* `[~]` N/A — Memory-safe TypeScript/JavaScript environment.