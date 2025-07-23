import { Uuid, type UuidValue } from "./Uuid";
import { faker } from "@faker-js/faker";

export const mockUuid = (): Uuid =>
{
  const value: UuidValue = faker.string.uuid();

  return Uuid.unsafeCreate(value);
};
