import type { IEmailAddressFactory } from "./IEmailAddressFactory";
import { EmailAddress } from "@/domain/value-objects/EmailAddress";

export const mockEmailAddressFactory = (): IEmailAddressFactory =>
{
  return {
    create: value => value instanceof EmailAddress ? value : EmailAddress.unsafeCreate(value),
  }
};
