export function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? parsed.filter((tag): tag is string => typeof tag === 'string')
      : []
  } catch {
    return []
  }
}

export function stringifyTags(tags: string[]): string {
  return JSON.stringify(tags)
}

export function parseBlockData<T = unknown>(raw: string): T {
  return JSON.parse(raw) as T
}

export function stringifyBlockData(data: unknown): string {
  return JSON.stringify(data)
}
