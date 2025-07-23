import { Money, type MoneyValue } from "./Money";
import { faker } from "@faker-js/faker";

export const mockMoney = (): Money =>
{
  const value: MoneyValue = faker.number.float({ min: 0.01, fractionDigits: 2 });

  return Money.unsafeCreate(value);
};
