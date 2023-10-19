import { IsString, Length } from "class-validator";

export class RegisterUserDto {
    
    @IsString()
    @Length(5,10)
    username: string;

    @IsString()
    @Length(4,15)
    password: string

    @IsString()
    @Length(5,45)
    name:string;

    @IsString()
    @Length(5,45)
    email: string

}