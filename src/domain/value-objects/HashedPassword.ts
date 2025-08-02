import type { HashedPasswordParserInput, IHashedPasswordParser } from "@/domain/parsers/IHashedPasswordParser";
import type { IPasswordHasherService } from "@/domain/services/IPasswordHasherService";
import type { Password } from "./Password";

export class HashedPassword {
  private constructor(
    private readonly _value: HashedPasswordValue,
  ) {}

  public static create(input: HashedPasswordCreateValue, { parser }: HashedPasswordCreateDependencies): HashedPassword {
    if (input instanceof HashedPassword) {
      return new HashedPassword(input.value);
    }
    const parsedValue = parser.parse(input);

    return new HashedPassword(parsedValue);
  }
  public static async fromPassword(password: Password, { hasher }: HashedPasswordFromPasswordDependencies): Promise<HashedPassword> {
    const passwordHash: string = await hasher.hash(password.value);

    return new HashedPassword(passwordHash);
  }
  public static unsafeCreate(validValue: HashedPasswordValue): HashedPassword {
    return new HashedPassword(validValue);
  }

  public get value() { return this._value; }
}

export type HashedPasswordValue = string

export type HashedPasswordCreateValue = HashedPasswordParserInput | HashedPassword

export type HashedPasswordCreateDependencies = {
  parser: IHashedPasswordParser;
}

export type HashedPasswordFromPasswordDependencies = {
  hasher: IPasswordHasherService;
}
