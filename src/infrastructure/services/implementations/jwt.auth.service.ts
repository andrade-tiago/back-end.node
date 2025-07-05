import { IAuthService } from "@/application/services/auth.service";
import jwt from "jsonwebtoken";

export class JwtAuthService implements IAuthService {
  public constructor(
    private readonly _secret: string,
    private readonly _expiresInSeconds: number,
  ) {}

  public async generateToken<T extends object>(payload: T): Promise<string> {
    return jwt.sign(payload, this._secret, {
      expiresIn: this._expiresInSeconds,
    });
  }

  public async parseToken<T extends object>(token: string): Promise<T> {
    return jwt.verify(token, this._secret) as T;
  }
};
