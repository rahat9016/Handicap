export function formatDuration(ms: number): string {
  // Convert ms → total seconds
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Return in "M.SS" format (like 1.30)
  return `${minutes}.${seconds.toString().padStart(2, "0")}`;
}
