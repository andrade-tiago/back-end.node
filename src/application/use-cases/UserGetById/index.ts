import type { UserOutput } from "@/application/dtos/UserOutput";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import { ErrorMessages, NotFoundError } from "@/application/errors";

export class UserGetByIdUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(id: string): Promise<UserOutput> {
    const userId = this._uuidFactory.create(id);

    const user = await this._userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.User.NotFoundById(userId.value));
    }

    return this._userMapper.toOutput(user);
  }
}
