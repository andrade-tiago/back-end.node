import type { IEmailAddressFactory } from "@/domain/factories/IEmailAddressFactory";
import type { IUserFactory } from "@/domain/factories/IUserFactory";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UserOutput } from "@/application/dtos/UserOutput";
import type { UserCreateInput } from "./input";
import { ConflictError, ErrorMessages } from "@/application/errors";

export class UserCreateUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userFactory: IUserFactory,
    private readonly _emailFactory: IEmailAddressFactory,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(data: UserCreateInput): Promise<UserOutput> {
    const userEmail = this._emailFactory.create(data.email);

    {
      const emailIsAlreadyInUse = await this._userRepository.containsUserWithEmail(userEmail);

      if (emailIsAlreadyInUse) {
        throw new ConflictError(ErrorMessages.User.Conflict(userEmail.value));
      }
    }

    const user = await this._userFactory.createActive({
      name: data.name,
      email: userEmail,
      password: data.password,
      cpf: data.cpf,
      role: data.role,
    });

    await this._userRepository.save(user);

    return this._userMapper.toOutput(user);
  }
}
