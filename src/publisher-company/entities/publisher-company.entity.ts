import { Prisma } from "@prisma/client";

export class PublisherCompany {
    id: string;
    name: string;
    usersId: string;
    user_owner?: Prisma.UsersCreateNestedOneWithoutBookInput;
}
