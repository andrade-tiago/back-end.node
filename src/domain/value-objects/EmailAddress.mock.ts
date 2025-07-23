import { EmailAddress, type EmailAddressValue } from "./EmailAddress";
import { faker } from "@faker-js/faker";

export const mockEmailAddress = (): EmailAddress =>
{
  const value: EmailAddressValue = faker.internet.email();

  return EmailAddress.unsafeCreate(value);
};
