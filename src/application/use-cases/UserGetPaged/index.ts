import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UserOutput } from "@/application/dtos/UserOutput";
import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";
import type { UserGetPagedInput } from "./input";

export class UserGetPagedUseCase {
  private readonly _positiveIntFactory: UserGetPagedUseCaseDependencies['positiveIntFactory'];
  private readonly _userMapper: UserGetPagedUseCaseDependencies['userMapper'];
  private readonly _userRepository: UserGetPagedUseCaseDependencies['userRepository'];

  public constructor(dependencies: UserGetPagedUseCaseDependencies) {
    this._positiveIntFactory = dependencies.positiveIntFactory;
    this._userMapper = dependencies.userMapper;
    this._userRepository = dependencies.userRepository;
  }

  public async execute(props: UserGetPagedInput): Promise<UserOutput[]> {
    const users = await this._userRepository.getPaged({
      pageNumber: this._positiveIntFactory.create(props.pageNumber),
      pageSize: this._positiveIntFactory.create(props.pageSize),
    });

    return users.map(this._userMapper.toOutput);
  }
}

type UserGetPagedUseCaseDependencies = {
  positiveIntFactory: IPositiveIntFactory;
  userMapper: IUserMapper;
  userRepository: IUserRepository;
}
