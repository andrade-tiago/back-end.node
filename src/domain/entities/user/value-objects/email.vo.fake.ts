import { faker } from "@faker-js/faker";
import { Email } from "./email.vo";

export const makeFakeEmail = (): Email => {
  return new Email(faker.internet.email());
};
