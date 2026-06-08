import { Repository } from "@/types";

const GITHUB_API = "https://api.github.com";
const USERNAME = "alexissdev";

const projectMeta: Record<string, { featured: boolean }> = {
  "alexissdev.dev": { featured: true },
  hermes: { featured: true },
  caduceus: { featured: true },
  events: { featured: true },
  "braian-contruciones": { featured: true },
  "lightweight-storage": { featured: true },
};

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_ACCESS_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
  }
  return headers;
}

export async function getRepositories(): Promise<Repository[]> {
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100`, {
    headers: buildHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = await res.json();

  return data
    .filter(
      (repo) => !repo.fork && !repo.archived && repo.description
    )
    .map((repo) => ({
      fullName: repo.full_name,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      defaultBranch: repo.default_branch,
      topics: repo.topics ?? [],
      featured: projectMeta[repo.name]?.featured ?? false,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      updatedAt: repo.updated_at,
      language: repo.language ?? "",
    }));
}

export async function getReadme(repoName: string): Promise<string | null> {
  const res = await fetch(
    `${GITHUB_API}/repos/${USERNAME}/${repoName}/readme`,
    {
      headers: {
        ...buildHeaders(),
        Accept: "application/vnd.github.v3.raw",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return null;
  return res.text();
}

export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  total: number;
  weeks: ContributionWeek[];
}

export async function getContributions(): Promise<ContributionData | null> {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) return null;

  const query = `{
    user(login: "${USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  return {
    total: calendar.totalContributions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    weeks: calendar.weeks.map((w: any) => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      days: w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
      })),
    })),
  };
}

export async function getRepository(repoName: string): Promise<Repository | null> {
  const res = await fetch(`${GITHUB_API}/repos/${USERNAME}/${repoName}`, {
    headers: buildHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const repo: any = await res.json();

  return {
    fullName: repo.full_name,
    name: repo.name,
    description: repo.description ?? "",
    stars: repo.stargazers_count,
    defaultBranch: repo.default_branch,
    topics: repo.topics ?? [],
    featured: projectMeta[repo.name]?.featured ?? false,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    updatedAt: repo.updated_at,
    language: repo.language ?? "",
  };
}
