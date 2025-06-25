import { Order } from "@/domain/entities/order";
import { OrderOutput } from "../order.output";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { IOrderRepository } from "@/domain/repositories/order.repository";
import { NotFoundError } from "@/application/errors/not-found.error";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";
import { IOrderMapper } from "@/application/mappers/order.mapper";

export class OrderGetByIdUseCase {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _orderRepository: IOrderRepository,
    private readonly _orderMapper: IOrderMapper,
  ) {}

  public async execute(id: Order['id']['value']): Promise<OrderOutput> {
    const idObj = this._uuidFactory.createFromString(id);

    const order = await this._orderRepository.getById(idObj);

    if (!order) {
      throw new NotFoundError(ApplicationErrorMessages.Order.NotFoundById(id));
    }
    return this._orderMapper.toOutput(order);
  }
}
