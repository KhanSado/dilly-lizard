import { Prisma } from "@prisma/client";

export class Author implements Prisma.AuthorCreateInput {
    id?: string;
    name: string;
    lastname: string;
    usersId: string;
    user_owner?: Prisma.UsersCreateNestedOneWithoutBookInput;
}