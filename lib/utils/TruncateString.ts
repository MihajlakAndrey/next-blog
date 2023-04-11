export const truncateString = (string: string, num: number) => {
  return string.length > num ? string.slice(0, num) + '...' : string
}
