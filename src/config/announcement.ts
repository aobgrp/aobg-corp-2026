// Sitewide announcement banner content.
// To post a notice: set `enabled` to true and update `message`, then redeploy.
// To remove it: set `enabled` to false (or clear `message`), then redeploy.
export const announcement = {
  /** Set to false to hide the banner sitewide. */
  enabled: true,
  /** The message shown to all visitors. Keep it short. */
  message: 'Our offices will be closed Thurs, November 26, and Fri, November 27, in observance of Thanksgiving',
} as const
