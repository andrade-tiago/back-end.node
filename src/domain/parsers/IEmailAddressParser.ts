import type { IParser } from "./__IParser";
import type { EmailAddress } from "@/domain/value-objects/EmailAddress";

export interface IEmailParser extends IParser<EmailAddress['_value']> {}
