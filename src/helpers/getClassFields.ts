export function getObjectFields<T>(obj: T): string[] {
  return Object.getOwnPropertyNames(obj);
  // return Object.keys(obj) as Array<keyof T>;
}
