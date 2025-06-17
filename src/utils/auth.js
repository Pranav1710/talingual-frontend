export function isGoogleConnected() {
  return document.cookie.split("; ").some((c) => c.startsWith("google_token="));
}
