import { NextResponse } from "next/server";
import type { GitHubRepo } from "@/types/github";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/users/Starland9/repos?sort=stars&per_page=20",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repos");
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks and sort by stars
    const filteredRepos = repos
      .filter((repo) => !repo.name.includes("fork"))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return NextResponse.json(filteredRepos);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
