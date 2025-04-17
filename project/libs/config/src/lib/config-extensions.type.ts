type ConfigExtentionOptions = {
  envVariable: string;
  defaultValue?: string;
  transform?: (value: string) => string | number;
};

type ConfigExtensions = {
  [key: string]: ConfigExtentionOptions;
};

type GetConfigFromExtensions<T extends ConfigExtensions> = Record<
  keyof T,
  string | number
>;

export type {
  ConfigExtentionOptions,
  ConfigExtensions,
  GetConfigFromExtensions,
};
