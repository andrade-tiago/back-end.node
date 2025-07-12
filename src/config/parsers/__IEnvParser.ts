export type Env = {
  HASH_SALT_OR_ROUNDS: number | string;
  JWT_SECRET: string;
  JWT_TOKEN_DURATION_SECS: number;
}

export interface IEnvParser {
  parse(envObj: unknown): Env;
}
