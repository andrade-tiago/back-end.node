import { IEnvParser } from '@/config/env.parser';

export class AppConfig {
  public readonly accessTokenTtl: number;
  public readonly hashSaltOrRounds: number | string;

  public constructor(envParser: IEnvParser) {
    const envData = envParser.parse(process.env);

    this.accessTokenTtl   = envData.ACCESS_TOKEN_TTL;
    this.hashSaltOrRounds = envData.HASH_SALT_OR_ROUNDS;
  }
}
