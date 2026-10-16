/**
 * Neon connection strings use sslmode=require, which node-postgres warns will
 * change meaning. Neon serves publicly trusted certificates, so pin the strict
 * mode explicitly.
 */
export function withVerifiedSsl(connectionString: string) {
  const url = new URL(connectionString);
  if (url.searchParams.get("sslmode") === "require") url.searchParams.set("sslmode", "verify-full");
  return url.toString();
}
