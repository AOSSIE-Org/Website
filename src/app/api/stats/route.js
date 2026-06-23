import { NextResponse } from 'next/server';
import projects from '@/helper/projects';

export async function GET() {
  try {
    const startYear = 2016;
    const currentYear = new Date().getFullYear();
    const yearsOfAossie = currentYear - startYear;
    
    // Count projects from the helper file as requested
    const completedProjectsCount = projects.length;

    // Fetch GitHub Data
    // Note: Unauthenticated requests are limited to 60 per hour per IP.
    const orgs = ['AOSSIE-Org'];
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      // Add 'Authorization': `token ${process.env.GITHUB_TOKEN}` if you have one
    };

    // 1. Fetch Repositories
    const reposPromises = orgs.map(async (org) => {
      const res = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100&type=public`, { headers, next: { revalidate: 3600 } });
      if (!res.ok) {
        console.error(`Failed to fetch repos for ${org}: ${res.statusText}`);
        return [];
      }
      return res.json();
    });

    const reposArrays = await Promise.all(reposPromises);
    const repos = reposArrays.flat();

    // 2. Process for Graph (Repos per year)
    // The user wants "Number of repos in (green) over the past years".
    // We will group by 'created_at'.
    const repoCountsByYear = {};
    const yearsSet = new Set();
    
    // Initialize years from startYear to currentYear to ensure continuous axis
    for (let y = startYear; y <= currentYear; y++) {
        repoCountsByYear[y] = 0;
        yearsSet.add(y);
    }

    repos.forEach(repo => {
      const year = new Date(repo.created_at).getFullYear();
      if (year >= startYear) {
          repoCountsByYear[year] = (repoCountsByYear[year] || 0) + 1;
      }
    });

    const labels = Object.keys(repoCountsByYear).sort((a, b) => parseInt(a) - parseInt(b));
    const data = labels.map(year => repoCountsByYear[year]);


    // 3. Count Contributors
    // Fetching contributors for ALL repos consumes too much rate limit (N requests).
    // We will proactively fetch contributors for the top 6 most starred/popular repos to get a good estimate.
    // Sorting repos by stargazers_count

    const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
    
    
    const contributorIds = new Set();
    
    const contributorPromises = topRepos.map(async (repo) => {
        try {
            const contribRes = await fetch(repo.contributors_url + '?per_page=100', { headers, next: { revalidate: 3600 } });
            if (contribRes.ok) {
                const contributors = await contribRes.json();
                if (Array.isArray(contributors)) {
                    contributors.forEach(c => contributorIds.add(c.id));
                }
            }
        } catch (e) {
            console.error(`Failed to fetch contributors for ${repo.name}`, e);
        }
    });

    await Promise.all(contributorPromises);

    // Fallback if APIs fail or return 0 (which is unlikely for top repos)
    const contributorCount = contributorIds.size > 0 ? contributorIds.size : 70; 

    return NextResponse.json({
      years: yearsOfAossie,
      projects: completedProjectsCount,
      contributors: contributorCount,
      graphData: {
        labels,
        data
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
