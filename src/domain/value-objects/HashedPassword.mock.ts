import { faker } from "@faker-js/faker";
import { HashedPassword, type HashedPasswordValue } from "./HashedPassword";

export const mockHashedPassword = (): HashedPassword =>
{
  const value: HashedPasswordValue = '$2'
    + faker.helpers.arrayElement(['a', 'y', 'b'])
    + '$'
    + faker.number.int({ min: 4, max: 31 }).toString().padStart(2, '0')
    + '$'
    + faker.string.alphanumeric(53);
  
  return HashedPassword.unsafeCreate(value);
};
