export default interface Repository {
  fullName: string;
  name: string;
  description: string;
  stars: number;
  defaultBranch: string;
  topics: string[];
  featured: boolean
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  language: string;
}

export const getApiUrl = (): string => {
  return "https://api.github.com";
};
