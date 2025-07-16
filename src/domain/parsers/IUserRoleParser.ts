import type { IParser } from "./__IParser";
import type { UserRoleEnum } from "@/domain/enums/UserRoleEnum";

export type UserRoleParserInput = string

export interface IUserRoleParser extends IParser<UserRoleParserInput, UserRoleEnum> {}
