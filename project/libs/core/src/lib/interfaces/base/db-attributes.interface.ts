type DbAttributes<T = {}> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { DbAttributes };
