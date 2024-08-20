import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống !' })
  name: string;
  @IsNotEmpty({ message: 'Email không được để trống !' })
  @IsEmail({}, { message: 'Email không đúng định dạng !' })
  email: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống !' })
  password: string;

  //Không validate thì thêm cái này vào
  @IsOptional()
  phone: string;
  @IsOptional()
  address: string;
  @IsOptional()
  image: string;
}
