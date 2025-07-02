import { faker } from "@faker-js/faker";
import { Password } from "./password.vo";

export const makeFakePassword = (): Password => {
  const hashedPassword: string = '$2a$12$' + faker.string.alphanumeric(53);

  return new Password(hashedPassword);
};
