import { IUserRepository } from "@/repositories/user.repository";
import { UserOutput } from "../user.output";
import { UserGetPagedInput } from "./user-get-paged.input";
import { IUserMapper } from "@/mappers/user.mapper";

export class UserGetPagedUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(props: UserGetPagedInput): Promise<UserOutput[]> {
    const users = await this._userRepository.getPaged({
      pageNumber: props.pageNumber,
      pageSize: props.pageSize,
    });

    return users.map(this._userMapper.toOutput);
  }
}

