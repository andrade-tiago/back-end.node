import { User } from "@/domain/entities/User";

export type OrderGetByUserIdUseCaseInput = {
  userId: User['id']['value'];
  pageSize: number;
  pageNumber: number;
}
