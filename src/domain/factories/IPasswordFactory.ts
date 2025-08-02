import type { Password, PasswordCreateValue } from "@/domain/value-objects/Password";

export interface IPasswordFactory {
  create(value: PasswordCreateValue): Password;
}
