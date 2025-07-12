import type { HashedPassword } from "@/domain/value-objects/HashedPassword";

export interface IPasswordFactory {
  createFromPlainText(plainText: string): Promise<HashedPassword>;
  createFromHashedText(hashedText: string): HashedPassword;
}
