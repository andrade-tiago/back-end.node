export type Env = {
  ACCESS_TOKEN_TTL: number;
  HASH_SALT_OR_ROUNDS: number | string;
}

export interface IEnvParser {
  parse(envObj: unknown): Env;
}
