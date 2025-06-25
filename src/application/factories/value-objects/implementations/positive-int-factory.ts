import { PositiveInt } from "@/domain/shared/value-objects/positive-int.vo";
import { IPositiveIntFactory } from "../positive-int.factory";

export class PositiveIntFactory implements IPositiveIntFactory {
  public create(value: number): PositiveInt {
    return new PositiveInt(value);
  }
}
