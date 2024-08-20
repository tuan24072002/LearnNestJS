import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { hashPassword } from '@/utils/util';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    //check email
    const isExist = await this.isEmailExist(email);

    if (isExist) {
      throw new BadRequestException(
        `Email đã tồn tại: ${email}. Vui lòng sử dụng email khác !`,
      );
    }
    //hash password
    const hash = hashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hash,
      phone,
      address,
      image,
    });
    return {
      id: user.id,
      message: 'Đăng ký tài khoản thành công !',
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!Number(current)) return (current = 1);
    if (!Number(pageSize)) return (pageSize = 10);

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      // .select('-password')
      .sort(sort as any);
    return { results, totalPages };
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
    return {
      info: updateUser,
      message: 'Cập nhật người dùng thành công !',
    };
  }

  async remove(id: string) {
    //check _id
    if (mongoose.isValidObjectId(id)) {
      //delete
      const deleteUser = await this.userModel.deleteOne({ _id: id });
      return {
        info: deleteUser,
        message: `id: ${id} đã xóa thành công !`,
      };
    } else {
      throw new BadRequestException(`id: ${id} không đúng định dạng !`);
    }
  }
}
