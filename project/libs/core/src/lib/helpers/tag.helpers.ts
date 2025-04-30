import { uniqueArray } from './array.helpers';

export const cleanTags = (tags: string[]): string[] => {
  return uniqueArray(tags).map((tag: string) => tag.trim().toLocaleLowerCase());
};
