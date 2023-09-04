// Function to calculate the time taken to complete a todo in seconds
export function calculateTimeTaken(createdAt: Date): number {
  const currentTime = new Date().getTime();
  const startTime = new Date(createdAt).getTime();
  const timeTakenInSeconds = Math.floor((currentTime - startTime) / 1000);
  return timeTakenInSeconds;
}

// Function to format time in hh:mm:ss
export function formatTime(timeInSeconds: number): string {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(seconds).padStart(2, '0')}`;
}
