import type { OrderOutput } from "@/application/dtos/OrderOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IOrderMapper } from "@/domain/mappers/IOrderMapper";
import type { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class OrderGetByIdUseCase {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _orderRepository: IOrderRepository,
    private readonly _orderMapper: IOrderMapper,
  ) {}

  public async execute(id: UuidCreateValue): Promise<OrderOutput> {
    const idObj = this._uuidFactory.create(id);

    const order = await this._orderRepository.getById(idObj);

    if (!order) {
      throw new NotFoundError(ErrorMessages.Order.NotFoundById(idObj.value));
    }
    return this._orderMapper.toOutput(order);
  }
}
