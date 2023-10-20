import { IsString } from 'class-validator';

export class LoginRequestBody {
  username: string;

  @IsString()
  password: string;
}