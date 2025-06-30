import { faker } from "@faker-js/faker";
import { NonFutureDate } from "./non-future-date.vo";

export const makeFakeNonFutureDate = (): NonFutureDate => {
  return new NonFutureDate(faker.date.past());
};
