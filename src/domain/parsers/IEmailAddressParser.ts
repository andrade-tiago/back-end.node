import type { IParser } from "./__IParser";
import type { EmailAddress, EmailAddressCreateValue } from "@/domain/value-objects/EmailAddress";

export interface IEmailParser extends IParser<EmailAddressCreateValue, EmailAddress['_value']> {}
