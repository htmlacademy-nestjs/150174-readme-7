type WithRequiredId<T> = T & {
  id: string;
};

export { WithRequiredId };
