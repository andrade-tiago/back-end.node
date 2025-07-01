import { faker } from "@faker-js/faker";
import { NonNegativeInt } from "./non-negative-int.vo";

export const makeFakeNonNegativeInt = (): NonNegativeInt => {
  return new NonNegativeInt(faker.number.int({ min: 0 }));
};
