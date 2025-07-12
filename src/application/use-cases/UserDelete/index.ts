import type { UserOutput } from "@/application/dtos/UserOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import { DeletedUser } from "@/domain/entities/User";
import { isUserActive } from "@/domain/utils/isUserActive";
import { ConflictError, ErrorMessages, NotFoundError } from "@/application/errors";

export class UserDeleteUseCase {
  constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(id: UuidCreateValue): Promise<UserOutput> {
    const userId = this._uuidFactory.create(id);

    const user = await this._userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.User.NotFoundById(userId.value));
    }
    if (!isUserActive(user)) {
      throw new ConflictError(ErrorMessages.User.AlreadyDeleted(userId.value));
    }

    const deletedUser = DeletedUser.fromActiveUser(user);

    await this._userRepository.save(deletedUser);

    return this._userMapper.toOutput(deletedUser);
  }
}
