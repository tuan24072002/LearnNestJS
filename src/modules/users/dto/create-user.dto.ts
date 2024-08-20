import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống !' })
  name: string;
  @IsNotEmpty({ message: 'email không được để trống !' })
  @IsEmail({}, { message: 'Email không đúng định dạng !' })
  email: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống !' })
  password: string;
  phone: string;
  address: string;
  image: string;
}
