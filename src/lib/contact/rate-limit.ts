// Pure module (no path aliases), in-memory: valid for a single server instance.

type Clock = () => number;

/** Sliding window: at most `limit` hits per key during `windowMs`. */
export function createRateLimiter({
  limit = 5,
  windowMs = 60 * 60 * 1000,
  now = Date.now,
}: { limit?: number; windowMs?: number; now?: Clock } = {}) {
  const hits = new Map<string, number[]>();

  const sweep = (time: number) => {
    for (const [key, times] of hits) {
      const recent = times.filter((t) => time - t < windowMs);
      if (recent.length === 0) hits.delete(key);
      else hits.set(key, recent);
    }
  };

  return {
    /** Records a hit and returns false when the key is over the limit. */
    check(key: string): boolean {
      const time = now();
      if (hits.size > 1000) sweep(time);
      const recent = (hits.get(key) ?? []).filter((t) => time - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(time);
      hits.set(key, recent);
      return true;
    },
  };
}

/** Remembers fingerprints (e-mail + message) for `windowMs` to drop double submissions. */
export function createDuplicateGuard({
  windowMs = 60 * 1000,
  now = Date.now,
}: { windowMs?: number; now?: Clock } = {}) {
  const seen = new Map<string, number>();

  return {
    isDuplicate(fingerprint: string): boolean {
      const time = now();
      for (const [key, at] of seen) if (time - at >= windowMs) seen.delete(key);
      return seen.has(fingerprint);
    },
    remember(fingerprint: string) {
      seen.set(fingerprint, now());
    },
  };
}
