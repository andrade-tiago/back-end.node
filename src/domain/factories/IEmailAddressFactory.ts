import type { EmailAddress, EmailAddressCreateValue } from "@/domain/value-objects/EmailAddress";

export interface IEmailAddressFactory {
  create(value: EmailAddressCreateValue): EmailAddress;
}
