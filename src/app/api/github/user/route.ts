import { NextResponse } from "next/server";
import type { GitHubUser } from "@/types/github";

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/users/Starland9", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user: GitHubUser = await response.json();

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
