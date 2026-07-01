export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE").format(new Date(date));
}

