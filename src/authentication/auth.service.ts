import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/user.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { Users } from "src/users/user.model";
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class AuthService{
    constructor(
        private readonly prismaService: PrismaService, 
        private jwtService: JwtService, 
        private readonly usersService: UsersService
    ){}

    async login(loginDto: LoginDto):Promise<any>{
        const {username,password} = loginDto;

        const users =await this.prismaService.users.findUnique({
             where: {username}
        })

        if(!users){
             throw new NotFoundException('user not found')
        }

        const validatePassword = await bcrypt.compare(password,users.password)

        if(!validatePassword){
             throw new NotFoundException('Invalid password')
        }

        return {
             token: this.jwtService.sign({username})
        }
   }
   
   async register (createDto: RegisterUserDto): Promise<any>{
        const createUser = new Users();
        createUser.name = createDto.name;
        createUser.email = createDto.email;
        createUser.username = createDto.username;
        createUser.password = await bcrypt.hash(createDto.password, 10);

        const user = await this.usersService.createUser(createUser);

        return {
            token: this.jwtService.sign({ username: user.username }),
        };
    }
}