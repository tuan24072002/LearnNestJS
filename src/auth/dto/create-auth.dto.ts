import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email không được để trống !' })
  @IsEmail({}, { message: 'Email không đúng định dạng !' })
  email: string;
  @IsNotEmpty({ message: 'Password không được để trống !' })
  @IsStrongPassword(
    {
      minLength: 4,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Mật khẩu phải tối thiểu 4 ký tự, bao gồm tối thiểu 1 chữ viết hoa, 1 chữ viết thường, 1 số và 1 ký tự !!!',
    },
  )
  password: string;

  @IsOptional()
  name: string;
}
