import { IEnvParser } from '@/config/env.parser';

export class AppConfig {
  public readonly hashSaltOrRounds: number | string;
  public readonly jwtSecret: string;
  public readonly jwtTokenDurationSeconds: number;

  public constructor(envParser: IEnvParser) {
    const envData = envParser.parse(process.env);

    this.hashSaltOrRounds = envData.HASH_SALT_OR_ROUNDS;
    this.jwtSecret = envData.JWT_SECRET;
    this.jwtTokenDurationSeconds = envData.JWT_TOKEN_DURATION_SECS;
  }
}
