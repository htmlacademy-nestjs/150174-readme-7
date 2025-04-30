export const uniqueArray = <T>(array: T[]): T[] =>
  array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
