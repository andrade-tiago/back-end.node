import { faker } from "@faker-js/faker";
import { UserName } from "./user-name.vo";

export const makeFakeUserName = (): UserName => {
  return new UserName(faker.person.fullName());
};
