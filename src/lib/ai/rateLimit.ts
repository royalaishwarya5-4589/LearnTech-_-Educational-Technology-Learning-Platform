interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(key: string, maxRequests: number = 25, windowMs: number = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { timestamps: [] };

  // Remove timestamps outside time window
  const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  rateLimitMap.set(key, { timestamps: validTimestamps });

  return { allowed: true, remaining: maxRequests - validTimestamps.length };
}
