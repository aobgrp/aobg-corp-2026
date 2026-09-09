// Sitewide announcement banner content.
// To post a notice: set `enabled` to true and update `message`, then redeploy.
// To remove it: set `enabled` to false (or clear `message`), then redeploy.
export const announcement = {
  /** Set to false to hide the banner sitewide. */
  enabled: false,
  /** The message shown to all visitors. Keep it short. */
  message: 'Our offices will be closed on Monday, September 7, 2026 in observance of Labor Day.',
} as const
