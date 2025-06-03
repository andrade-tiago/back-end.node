export type Env = {
  ACCESS_TOKEN_TTL: number;
}

export interface IEnvParser {
  parse(envObj: unknown): Env;
}
