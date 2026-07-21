export interface Repository {
  fullName: string;
  name: string;
  description: string;
  stars: number;
  defaultBranch: string;
  topics: string[];
  featured: boolean;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  pushedAt: string;
  language: string;
  homepage: string | null;
}
