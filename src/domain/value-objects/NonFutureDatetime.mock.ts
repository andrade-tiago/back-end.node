import { NonFutureDatetime, type NonFutureDatetimeValue } from "./NonFutureDatetime";
import { faker } from "@faker-js/faker";

export const mockNonFutureDatetime = (): NonFutureDatetime =>
{
  const value: NonFutureDatetimeValue = faker.date.past().toISOString();

  return NonFutureDatetime.unsafeCreate(value);
};
