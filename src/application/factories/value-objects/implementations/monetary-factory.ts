import { Monetary } from "@/domain/shared/value-objects/monetary.vo";
import { IMonetaryFactory } from "../monetary.factory";

export class MonetaryFactory implements IMonetaryFactory {
  public create(value: number): Monetary {
    return new Monetary(value);
  }
}
