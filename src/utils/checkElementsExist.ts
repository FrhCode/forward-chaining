export default function checkElementsExist(
  target: any[],
  array2: any[],
): boolean {
  for (let i = 0; i < array2.length; i++) {
    if (!target.includes(array2[i])) {
      return false;
    }
  }
  return true;
}
