import { makeFakeUuid } from "@/domain/shared/value-objects/uuid.vo.fake";
import { OrderItem } from ".";
import { makeFakePositiveInt } from "@/domain/shared/value-objects/positive-int.vo.fake";
import { makeFakeMonetary } from "@/domain/shared/value-objects/monetary.vo.fake";

export const makeOrderItem = (): OrderItem => {
  return new OrderItem({
    productId: makeFakeUuid(),
    quantity: makeFakePositiveInt(),
    unitPrice: makeFakeMonetary(),
  });
};
