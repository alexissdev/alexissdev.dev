import Repository, { getApiUrl } from "./github.repository";
import { projectMeta } from "@/data/projectMeta";

export async function getData(endPoint: string): Promise<any> {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const url = `${getApiUrl()}${endPoint}`;

  const response = accessToken
    ? await fetch(url, { headers: { Authorization: `token ${accessToken}` } })
    : await fetch(url);

  return await response.json();
}

export async function getRepositoryOfUser(
  userName: string
): Promise<Repository[]> {
  const repositoryArray: Repository[] = [];
  const repositories = await getData(`/users/${userName}/repos`);

  for (const repo of repositories) {
    if (repo.fork || repo.archived || !repo.description) {
      continue;
    }

    repositoryArray.push({
      fullName: repo.full_name,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      defaultBranch: repo.default_branch,
      topics: repo.topics,
      featured: projectMeta[repo.name]?.featured ?? false,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      updatedAt: repo.updated_at,
      language: repo.language,
    });
  }

  return repositoryArray;
}

export async function getReadme(owner: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    }
  );

  if (!res.ok) return null;

  const markdown = await res.text();
  return markdown;
}
