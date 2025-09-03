import { testUserMapper } from "@/domain/mappers/IUserMapper.test";
import { UserMapper } from "./UserMapper";

testUserMapper({
  getInstanceFunc: () => new UserMapper(),
});
