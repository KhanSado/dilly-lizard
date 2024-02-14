import { Prisma } from "@prisma/client";

export class Gender implements Prisma.GenderCreateInput {
    id?: string;
    name: string;
    description: string;
    usersId: string;
    user_owner?: Prisma.UsersCreateNestedOneWithoutBookInput;
}