export function formatDate(date: Date) {
  console.log(date);
  return new Intl.DateTimeFormat("de-DE").format(new Date(date));
}

