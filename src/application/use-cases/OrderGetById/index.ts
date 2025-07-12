import type { OrderOutput } from "@/application/dtos/OrderOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IOrderMapper } from "@/domain/mappers/IOrderMapper";
import type { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class OrderGetByIdUseCase {
  private readonly _uuidFactory: OrderGetByIdUseCaseDependencies['uuidFactory'];
  private readonly _orderRepository: OrderGetByIdUseCaseDependencies['orderRepository'];
  private readonly _orderMapper: OrderGetByIdUseCaseDependencies['orderMapper'];

  public constructor(dependencies: OrderGetByIdUseCaseDependencies) {
    this._orderMapper = dependencies.orderMapper;
    this._orderRepository = dependencies.orderRepository;
    this._uuidFactory = dependencies.uuidFactory;
  }

  public async execute(id: UuidCreateValue): Promise<OrderOutput> {
    const idObj = this._uuidFactory.create(id);

    const order = await this._orderRepository.getById(idObj);

    if (!order) {
      throw new NotFoundError(ErrorMessages.Order.NotFoundById(idObj.value));
    }
    return this._orderMapper.toOutput(order);
  }
}

type OrderGetByIdUseCaseDependencies = {
  orderMapper: IOrderMapper;
  orderRepository: IOrderRepository;
  uuidFactory: IUuidFactory;
}
