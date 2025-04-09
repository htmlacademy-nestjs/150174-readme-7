type Environment = 'development' | 'production' | 'test' | 'stage';

interface AppBaseConfig {
  port: number;
  globalPrefix: string;
  environment: Environment;
}

export type { AppBaseConfig, Environment };
