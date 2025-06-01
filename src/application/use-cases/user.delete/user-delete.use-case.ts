import { ErrorMessages } from "@/domain/constants/error-messages";
import { NotFoundError } from "@/domain/errors/not-found-error";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { UserOutput } from "../user.output";
import { Uuid } from "@/domain/value-objects/uuid.vo";
import { ConflictError } from "@/domain/errors/conflict-error";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { DeletedUser } from "@/domain/entities/user";

export class UserDeleteUseCase {
  constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(id: Uuid['value']): Promise<UserOutput> {
    const userId = this._uuidFactory.createFromString(id);

    const user = await this._userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.UserNotFound);
    }
    if (!user.isActive()) {
      throw new ConflictError(ErrorMessages.UserAlreadyDeleted);
    }

    const deletedUser = DeletedUser.from(user);

    await this._userRepository.save(deletedUser);

    return this._userMapper.toOutput(deletedUser);
  }
}
