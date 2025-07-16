import type { IParser } from "./__IParser";
import type { EmailAddressValue } from "@/domain/value-objects/EmailAddress";

export type EmailAddressParserInput = string

export interface IEmailParser extends IParser<EmailAddressParserInput, EmailAddressValue> {}
