import type { IPasswordHasherService } from "@/domain/services/IPasswordHasherService";
import bcrypt from "bcrypt";

export class BcryptPasswordHasherService implements IPasswordHasherService {
  public constructor(
    private readonly _saltOrRounds: number | string,
  ) {}

  public hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this._saltOrRounds);
  }

  public compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
