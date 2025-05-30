import { Password } from "./password.vo";

export interface IPasswordFactory {
  createFromPlainText(plainText: string): Promise<Password>;
  createFromHashedText(hashedText: string): Password;
}
