/**
 * The staging design contains editorial notes ("untuk diisi", "perlu
 * dikoreksi") and placeholder blocks ("[Nama]", photo boxes). They are for the
 * web team, so they render only when SHOW_STAGING_NOTES=true.
 */
export function showStagingContent() {
  return process.env.SHOW_STAGING_NOTES === "true";
}

export function StagingNote({ className, children }: { className: string; children: React.ReactNode }) {
  if (!showStagingContent()) return null;
  return <div className={className}>{children}</div>;
}

/** Placeholder content that should not appear on the public site until it is filled in. */
export function StagingOnly({ children }: { children: React.ReactNode }) {
  return showStagingContent() ? <>{children}</> : null;
}
