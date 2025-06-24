import { Password } from "@/domain/entities/user/value-objects/password.vo";
import { IPasswordFactory } from "../password.factory";
import { IHashService } from "@/application/services/hash.service";

export class PasswordFactory implements IPasswordFactory {
  public constructor(
    private readonly _hashService: IHashService,
  ) {}

  public async createFromPlainText(plainText: string): Promise<Password> {
    const hashedStr = await this._hashService.hash(plainText);

    return this.createFromHashedText(hashedStr);
  }

  public createFromHashedText(hashedText: string): Password {
    return new Password(hashedText);
  }
}
