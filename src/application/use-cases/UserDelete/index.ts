import type { UserOutput } from "@/application/dtos/UserOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UuidCreateValue } from "@/domain/value-objects/Uuid";
import { DeletedUser } from "@/domain/entities/User";
import { isUserActive } from "@/domain/utils/isUserActive";
import { ConflictError, ErrorMessages, NotFoundError } from "@/application/errors";

export class UserDeleteUseCase {
  private readonly _userMapper: UserDeleteUseCaseDependencies['userMapper'];
  private readonly _userRepository: UserDeleteUseCaseDependencies['userRepository'];
  private readonly _uuidFactory: UserDeleteUseCaseDependencies['uuidFactory'];

  constructor(dependencies: UserDeleteUseCaseDependencies) {
    this._userMapper = dependencies.userMapper;
    this._userRepository = dependencies.userRepository;
    this._uuidFactory = dependencies.uuidFactory;
  }

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

type UserDeleteUseCaseDependencies = {
  userMapper: IUserMapper;
  userRepository: IUserRepository;
  uuidFactory: IUuidFactory;
}
