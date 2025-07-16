import type { IParser } from "./__IParser";
import type { UserRoleEnum } from "@/domain/enums/UserRoleEnum";

export interface IUserRoleParser extends IParser<string, UserRoleEnum> {}
