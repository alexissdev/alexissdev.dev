import { Repository } from "@/types";

const GITHUB_API = "https://api.github.com";
const USERNAME = "alexissdev";

const projectMeta: Record<string, { featured: boolean }> = {
  "relay-backend": { featured: true },
  "relay-frontend": { featured: true },
  "quote-generator": { featured: true },
  annihilation: { featured: true },
  kronos: { featured: true },
  apolo: { featured: true },
};

export const featuredOrder = [
  "relay-backend",
  "relay-frontend",
  "quote-generator",
  "annihilation",
  "kronos",
  "apolo",
];

const projectOverrides: Record<
  string,
  { description: string; topics: string[]; homepage: string | null }
> = {
  "relay-backend": {
    description:
      "Slack-style chat app built as 7 independent microservices (auth, workspace, channel, messaging, notification, file, presence), each with its own data store, communicating asynchronously through Kafka events. Includes an API Gateway (JWT, CORS, rate limiting), service discovery via Eureka, centralized config, and a React + WebSocket (STOMP) frontend packaged as an installable PWA.",
    topics: [
      "Java",
      "Spring Boot",
      "Kafka",
      "RabbitMQ",
      "Redis",
      "React",
      "TypeScript",
      "Docker",
    ],
    homepage: null,
  },
  "relay-frontend": {
    description:
      "Frontend for Relay, a real-time Slack-style chat app. Built with React, TypeScript, Tailwind CSS and WebSocket (STOMP) for live messaging, and installable as a PWA on iOS and Android.",
    topics: ["React", "TypeScript", "Tailwind CSS", "WebSocket/STOMP", "Docker", "PWA"],
    homepage: null,
  },
  "quote-generator": {
    description:
      "Live production tool used by a construction company to generate and share branded PDF quotes from mobile, with one-tap WhatsApp sharing. Full account system (JWT auth, email verification, password recovery, rate limiting) built on Vercel serverless functions + MongoDB, alongside a fully offline anonymous mode. Installable, offline-capable PWA.",
    topics: ["React 19", "TypeScript", "Vercel Serverless", "MongoDB", "jsPDF", "PWA"],
    homepage: "https://presupuestos.braianconstruciones.com",
  },
  annihilation: {
    description:
      "Multi-server team-PvP network (BungeeCord proxy + Lobby + Game servers) built as 4 independent Java modules, decoupled via Redis pub/sub and MongoDB. Includes a distributed matchmaking pipeline, a 6-phase match state machine, 21 combat classes, and a companion documentation SPA in React with 22 routes and full-text search.",
    topics: ["Java 11", "BungeeCord", "Redis", "MongoDB", "React", "TypeScript"],
    homepage: "https://annihilation.alexissdev.dev",
  },
  kronos: {
    description:
      "Production Hardcore Factions (HCF) core with Domain-Driven Design architecture, split into 12 independent Gradle modules. Uses Guice for dependency injection and a Guava EventBus to decouple modules via domain events, with fully asynchronous I/O (CompletableFuture) over MongoDB and Redis. Companion docs site built as a dependency-free vanilla TypeScript SPA.",
    topics: ["Java 11", "Guice", "Guava EventBus", "MongoDB", "Redis", "Gradle"],
    homepage: "https://kronos.alexissdev.dev",
  },
  apolo: {
    description:
      "Spigot 1.8.8+ essentials plugin for Minecraft servers, providing economy, teleportation (TPA), warps, fly, god mode, item repair, and admin tools. Player and balance data is persisted in MongoDB, with Redis pub/sub keeping state synchronized in real time across servers.",
    topics: ["Java 11", "Spigot API", "MongoDB", "Redis", "Gradle"],
    homepage: null,
  },
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
    .map((repo) => {
      const override = projectOverrides[repo.name];
      return {
        fullName: repo.full_name,
        name: repo.name,
        description: override?.description ?? repo.description,
        stars: repo.stargazers_count,
        defaultBranch: repo.default_branch,
        topics: override?.topics ?? (repo.topics ?? []),
        featured: projectMeta[repo.name]?.featured ?? false,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        language: repo.language ?? "",
        homepage: override?.homepage ?? (repo.homepage || null),
      };
    });
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
  const override = projectOverrides[repo.name];

  return {
    fullName: repo.full_name,
    name: repo.name,
    description: override?.description ?? repo.description ?? "",
    stars: repo.stargazers_count,
    defaultBranch: repo.default_branch,
    topics: override?.topics ?? (repo.topics ?? []),
    featured: projectMeta[repo.name]?.featured ?? false,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    language: repo.language ?? "",
    homepage: override?.homepage ?? (repo.homepage || null),
  };
}
