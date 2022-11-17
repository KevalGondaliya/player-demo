export const secondsToHms = (d: number) => {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hour = h > 0 ? (h < 10 ? "0" + h : h) + ":" : "00:";
  const min = m > 0 ? (m < 10 ? "0" + m : m) + ":" : "00:";
  const sec = s > 0 ? (s < 10 ? "0" + s : s) : "00";
  if (h === 0) return min + sec;
  return hour + min + sec;
};
