import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { OrderOutput } from "../order.output";
import { OrderGetByUserIdUseCaseInput } from "./order-get-by-user-id.input";
import { IOrderRepository } from "@/domain/repositories/order.repository";
import { IPositiveIntFactory } from "@/application/factories/value-objects/positive-int.factory";
import { IOrderMapper } from "@/application/mappers/order.mapper";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { NotFoundError } from "@/application/errors/not-found.error";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";

export class OrderGetByUserIdUseCase {
  public constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _orderRepository: IOrderRepository,
    private readonly _positiveIntFactory: IPositiveIntFactory,
    private readonly _orderMapper: IOrderMapper,
  ) {}

  public async execute(data: OrderGetByUserIdUseCaseInput): Promise<OrderOutput[]> {
    const userIdObj = this._uuidFactory.createFromString(data.userId);

    {
      const userExists = await this._userRepository.containsUserWithId(userIdObj);

      if (!userExists) {
        throw new NotFoundError(ApplicationErrorMessages.User.NotFoundById(data.userId));
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
