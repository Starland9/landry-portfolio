import "server-only";

export type GithubStats = {
  publicRepos: number;
  followers: number;
  memberSince: number;
  fetchedAt: string;
};

const USER = "Starland9";

/** Public GitHub figures, cached for 1 hour. Returns null on any error (page still renders). */
export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${USER}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const user = (await response.json()) as { public_repos?: number; followers?: number; created_at?: string };
    if (typeof user.public_repos !== "number" || typeof user.followers !== "number" || !user.created_at) {
      return null;
    }
    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      memberSince: new Date(user.created_at).getFullYear(),
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
