type Environment = 'development' | 'production' | 'test' | 'stage';

interface AppBaseConfig {
  port: number;
  basePath: string;
  environment: Environment;
}

export type { AppBaseConfig, Environment };
