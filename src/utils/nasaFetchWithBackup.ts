
/**
 * A simple fetch utility that uses a primary NASA API key,
 * but if the request fails for quota or similar, tries a backup key.
 */
export async function nasaFetchWithBackup(
  urlBuilder: (apiKey: string) => string,
  primaryKey: string,
  backupKey: string,
  options?: RequestInit
) {
  // Try with primary key
  let res = await fetch(urlBuilder(primaryKey), options);
  if (res.ok) return res;
  // Retry with backup if quota or error
  res = await fetch(urlBuilder(backupKey), options);
  return res;
}
