import { User } from "@/entities/user";
import { UserOutput } from "@/use-cases/user.output";

export interface IUserMapper {
  toOutput(user: User): UserOutput;
}
