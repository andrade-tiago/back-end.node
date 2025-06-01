import { IPasswordService } from "@/domain/services/password.service";

export class Password {
  private constructor(
    private readonly _passwordHasher: IPasswordService,
    private readonly hashedPassword: string,
  ) {}

  get value() {
    return this.hashedPassword;
  }

  public static async fromPlainText(_passwordHasher: IPasswordService, plainText: string): Promise<Password> {
    const hashedPassword = await _passwordHasher.hash(plainText);

    return new Password(_passwordHasher, hashedPassword);
  }

  public static fromHashedText(_passwordHasher: IPasswordService, hashedText: string): Password {
    return new Password(_passwordHasher, hashedText);
  }

  public compareWith(plainText: string): Promise<boolean> {
    return this._passwordHasher.compare(plainText, this.hashedPassword);
  }
}