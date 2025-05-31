import { NonNegativeInt } from "./non-negative-int.vo";

export interface INonNegativeIntFactory {
  create(value: number) : NonNegativeInt
}
