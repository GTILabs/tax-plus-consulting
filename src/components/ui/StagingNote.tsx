/**
 * Placeholders for assets still to come from Pak Kalam (client logos, video
 * label) are for the web team, so they render only when SHOW_STAGING_NOTES=true.
 */
export function showStagingContent() {
  return process.env.SHOW_STAGING_NOTES === "true";
}
