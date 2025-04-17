type Environment = 'development' | 'production' | 'test' | 'stage';

type AppBaseConfig = {
  port: number;
  globalPrefix: string;
  environment: Environment;
};

export type { AppBaseConfig, Environment };
