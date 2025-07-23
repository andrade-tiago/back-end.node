import { FullName, type FullNameValue } from "./FullName";
import { faker } from "@faker-js/faker";

export const mockFullName = (): FullName =>
{
  const value: FullNameValue = faker.person.fullName();

  return FullName.unsafeCreate(value);
};
