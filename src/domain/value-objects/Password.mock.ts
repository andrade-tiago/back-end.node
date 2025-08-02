import { Password } from "./Password";
import { faker } from "@faker-js/faker";

export const mockPassword = (): Password =>
{
  const value = faker.internet.password();

  return Password.unsafeCreate(value);
};
