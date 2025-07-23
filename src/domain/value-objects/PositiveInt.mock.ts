import { PositiveInt, type PositiveIntValue } from "./PositiveInt";
import { faker } from "@faker-js/faker";

export const mockPositiveInt = (): PositiveInt =>
{
  const value: PositiveIntValue = faker.number.int({ min: 1 });

  return PositiveInt.unsafeCreate(value);
};
