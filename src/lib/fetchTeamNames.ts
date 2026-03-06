export async function fetchTeamNames(): Promise<string[]> {
  const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL || '').trim();
  if (!supabaseUrl) {
    return [];
  }

  const urls: string[] = [];
  urls.push(`${supabaseUrl}/functions/v1/list-team-names?t=${Date.now()}`);

  try {
    const host = new URL(supabaseUrl).hostname;
    const ref = host.split('.')[0];
    if (ref) {
      urls.push(`https://${ref}.functions.supabase.co/list-team-names?t=${Date.now()}`);
    }
  } catch {
    // Ignore malformed URL parsing and use primary endpoint only.
  }

  for (const endpoint of Array.from(new Set(urls))) {
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        cache: 'no-store',
      });
      if (!res.ok) {
        continue;
      }

      const body = (await res.json()) as { teams?: unknown };
      if (!Array.isArray(body?.teams)) {
        continue;
      }

      return (body.teams as unknown[])
        .filter((team): team is string => typeof team === 'string')
        .map((team) => team.trim())
        .filter(Boolean);
    } catch {
      // Try next endpoint.
    }
  }

  return [];
}
