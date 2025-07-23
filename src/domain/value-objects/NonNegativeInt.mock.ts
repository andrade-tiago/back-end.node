import { NonNegativeInt, type NonNegativeIntValue } from "./NonNegativeInt";
import { faker } from "@faker-js/faker";

export const mockNonNegativeInt = (): NonNegativeInt =>
{
  const value: NonNegativeIntValue = faker.number.int({ min: 0 });

  return NonNegativeInt.unsafeCreate(value);
};
