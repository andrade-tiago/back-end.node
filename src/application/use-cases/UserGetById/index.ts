import type { UserOutput } from "@/application/dtos/UserOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class UserGetByIdUseCase {
  private readonly _userMapper: UserGetByIdUseCaseDependencies['userMapper'];
  private readonly _userRepository: UserGetByIdUseCaseDependencies['userRepository'];
  private readonly _uuidFactory: UserGetByIdUseCaseDependencies['uuidFactory'];

  constructor(dependencies: UserGetByIdUseCaseDependencies) {
    this._userMapper = dependencies.userMapper;
    this._userRepository = dependencies.userRepository;
    this._uuidFactory = dependencies.uuidFactory;
  }

  public async execute(id: string): Promise<UserOutput> {
    const userId = this._uuidFactory.create(id);

    const user = await this._userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.User.NotFoundById(userId.value));
    }

    return this._userMapper.toOutput(user);
  }
}

type UserGetByIdUseCaseDependencies = {
  userMapper: IUserMapper;
  userRepository: IUserRepository;
  uuidFactory: IUuidFactory;
}
