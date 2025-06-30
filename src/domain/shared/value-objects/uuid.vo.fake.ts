import { Uuid } from "./uuid.vo";
import { faker } from "@faker-js/faker";

export const makeFakeUuid = (): Uuid => {
  return new Uuid(faker.string.uuid());
};
