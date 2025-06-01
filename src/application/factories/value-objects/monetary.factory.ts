import { Monetary } from "@/domain/value-objects/monetary.vo";

export interface IMonetaryFactory {
  create(value: number): Monetary;
}
