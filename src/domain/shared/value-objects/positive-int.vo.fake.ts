import { faker } from "@faker-js/faker";
import { PositiveInt } from "./positive-int.vo";

export const makeFakePositiveInt = (): PositiveInt => {
  return new PositiveInt(faker.number.int({ min: 1 }));
};
