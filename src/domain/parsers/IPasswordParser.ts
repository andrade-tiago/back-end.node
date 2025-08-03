import type { IParser } from "./__IParser";
import type { PasswordValue } from "@/domain/value-objects/Password";

export type PasswordParserInput = string

export interface IPasswordParser
  extends IParser<PasswordParserInput, PasswordValue> {}
