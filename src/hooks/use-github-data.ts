"use client";

import { useState, useEffect } from "react";
import { GitHubRepo, GitHubUser } from "@/types/github";

export function useGitHubData() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch repos and user data in parallel
        const [reposResponse, userResponse] = await Promise.all([
          fetch("/api/github/repos"),
          fetch("/api/github/user"),
        ]);

        if (!reposResponse.ok || !userResponse.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const [reposData, userData] = await Promise.all([
          reposResponse.json(),
          userResponse.json(),
        ]);

        setRepos(reposData);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { repos, user, loading, error };
}
