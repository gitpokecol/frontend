export function getCurrentTime() {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 6 && currentHour < 18 ? "day" : "night";
}
