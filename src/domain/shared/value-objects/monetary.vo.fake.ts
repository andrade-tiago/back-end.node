import { faker } from "@faker-js/faker";
import { Monetary } from "./monetary.vo";

export const makeFakeMonetary = (): Monetary => {
  return new Monetary(faker.number.float({ min: 1, fractionDigits: 2 }));
};
