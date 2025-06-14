import { Monetary } from "@/domain/shared/value-objects/monetary.vo";

export interface IMonetaryFactory {
  create(value: number): Monetary;
}
