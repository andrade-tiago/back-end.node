import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { UserOutput } from "@/application/dtos/UserOutput";
import type { IPositiveIntFactory } from "@/domain/factories/IPositiveIntFactory";
import type { UserGetPagedInput } from "./input";

export class UserGetPagedUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: IUserMapper,
    private readonly _positiveIntFactory: IPositiveIntFactory,
  ) {}

  public async execute(props: UserGetPagedInput): Promise<UserOutput[]> {
    const users = await this._userRepository.getPaged({
      pageNumber: this._positiveIntFactory.create(props.pageNumber),
      pageSize: this._positiveIntFactory.create(props.pageSize),
    });

    return users.map(this._userMapper.toOutput);
  }
}

