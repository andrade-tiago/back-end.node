import type { OrderGetByUserIdUseCaseInput } from "./input";
import type { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";
import type { IOrderMapper } from "@/domain/mappers/IOrderMapper";
import type { OrderOutput } from "@/application/dtos/OrderOutput";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class OrderGetByUserIdUseCase {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _orderRepository: IOrderRepository,
    private readonly _positiveIntFactory: IPositiveIntFactory,
    private readonly _orderMapper: IOrderMapper,
  ) {}

  public async execute(data: OrderGetByUserIdUseCaseInput): Promise<OrderOutput[]> {
    const userIdObj = this._uuidFactory.create(data.userId);

    {
      const userExists = await this._userRepository.containsUserWithId(userIdObj);

      if (!userExists) {
        throw new NotFoundError(ErrorMessages.User.NotFoundById(data.userId));
      }
    }

    const userOrders = await this._orderRepository.getByUserId({
      userId: userIdObj,
      pageNumber: this._positiveIntFactory.create(data.pageNumber),
      pageSize: this._positiveIntFactory.create(data.pageSize),
    });

    return userOrders.map(this._orderMapper.toOutput);
  }
}
