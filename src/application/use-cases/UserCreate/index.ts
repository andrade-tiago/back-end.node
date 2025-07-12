import type { IEmailAddressFactory } from "@/domain/factories/IEmailAddressFactory";
import type { IUserFactory } from "@/domain/factories/IUserFactory";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UserOutput } from "@/application/dtos/UserOutput";
import type { UserCreateInput } from "./input";
import { ConflictError, ErrorMessages } from "@/application/errors";

export class UserCreateUseCase {
  private readonly _emailFactory: UserCreateUseCaseDependencies['emailFactory'];
  private readonly _userFactory: UserCreateUseCaseDependencies['userFactory'];
  private readonly _userMapper: UserCreateUseCaseDependencies['userMapper'];
  private readonly _userRepository: UserCreateUseCaseDependencies['userRepository'];

  public constructor(dependencies: UserCreateUseCaseDependencies) {
    this._emailFactory = dependencies.emailFactory;
    this._userFactory = dependencies.userFactory;
    this._userMapper = dependencies.userMapper;
    this._userRepository = dependencies.userRepository;
  }

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

type UserCreateUseCaseDependencies = {
  emailFactory: IEmailAddressFactory;
  userFactory: IUserFactory;
  userMapper: IUserMapper;
  userRepository: IUserRepository;
}
