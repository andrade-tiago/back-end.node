import { Monetary } from "./monetary.vo";

export interface IMonetaryFactory {
  create(value: number): Monetary;
}
