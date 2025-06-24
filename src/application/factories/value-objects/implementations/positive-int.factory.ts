import { PositiveInt } from "@/domain/shared/value-objects/positive-int.vo";

export interface IPositiveIntFactory {
  create(value: number): PositiveInt;
}
