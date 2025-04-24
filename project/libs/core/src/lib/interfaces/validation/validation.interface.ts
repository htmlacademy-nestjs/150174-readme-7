export type Validation<T> = T & {
  message: string;
};

export type ValidationType<T, Keys extends keyof T> = {
  [K in Keys]-?: Validation<T[K]>;
};
