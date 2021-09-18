export function formatDate(date) {
  date = new Date(date)
  return `${date.getFullYear()}-${
		date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	}-${date.getDate()}`
}