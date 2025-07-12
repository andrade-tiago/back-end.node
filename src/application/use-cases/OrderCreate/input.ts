import type { PositiveIntCreateValue } from "@/domain/value-objects/PositiveInt";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";

export type OrderCreateInput = {
  userId: UuidCreateValue;
  items: Array<{
    productId: UuidCreateValue,
    quantity: PositiveIntCreateValue,
  }>;
}
