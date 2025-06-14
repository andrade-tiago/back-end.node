import { Password } from "@/domain/entities/user/value-objects/password.vo";

export interface IPasswordFactory {
  createFromPlainText(plainText: string): Promise<Password>;
  createFromHashedText(hashedText: string): Password;
}
