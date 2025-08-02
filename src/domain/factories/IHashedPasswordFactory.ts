import type { HashedPassword, HashedPasswordCreateValue } from "@/domain/value-objects/HashedPassword";
import type { Password, PasswordCreateValue } from "@/domain/value-objects/Password";

export interface IHashedPasswordFactory {
  fromPlain(value: Password | PasswordCreateValue): Promise<HashedPassword>;
  fromHash(value: HashedPassword | HashedPasswordCreateValue): HashedPassword;
}
