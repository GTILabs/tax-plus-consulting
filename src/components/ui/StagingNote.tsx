/**
 * Editorial notes from the staging design ("untuk diisi", "perlu dikoreksi").
 * They are instructions for the web team, so they render only when
 * SHOW_STAGING_NOTES=true and never on the public site by default.
 */
export function StagingNote({ className, children }: { className: string; children: React.ReactNode }) {
  if (process.env.SHOW_STAGING_NOTES !== "true") return null;
  return <div className={className}>{children}</div>;
}
