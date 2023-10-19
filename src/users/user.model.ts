import { Prisma } from "@prisma/client";

export class Users implements Prisma.UsersCreateInput {
    name: string;
    username: string;
    password: string;
    email: string;
}