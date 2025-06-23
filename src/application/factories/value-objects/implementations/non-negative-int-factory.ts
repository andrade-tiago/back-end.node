import { NonNegativeInt } from "@/domain/shared/value-objects/non-negative-int.vo";
import { INonNegativeIntFactory } from "../non-negative-int.factory";

export class NonNegativeIntFactory implements INonNegativeIntFactory {
  public create(value: number): NonNegativeInt {
    return new NonNegativeInt(value);
  }
}
