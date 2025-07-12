import type { EmailAddress } from "@/domain/value-objects/EmailAddress";
import type { IParser } from "./__IParser";

export interface IEmailParser extends IParser<EmailAddress['_value']> {}
