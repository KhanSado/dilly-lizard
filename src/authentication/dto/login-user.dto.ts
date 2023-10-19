import { IsString, Length } from "class-validator";

export class LoginDto {
    
    @IsString()
    @Length(5,12)
    username: string;

    @IsString()
    @Length(5,15)
    password: string

}