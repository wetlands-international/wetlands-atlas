export function getIdFromString(value: string) {
  return value.split(" ").join("-").toLowerCase();
}
