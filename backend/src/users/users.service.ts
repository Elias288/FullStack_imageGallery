import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { userName, password } = createUserDto;

    const existingUser = await this.findByName(userName);
    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User();
    user.password = hashedPassword;
    user.userName = userName;
    await this.usersRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userId: number) {
    return this.usersRepository.findOneBy({ userId });
  }

  findByName(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName });
  }

  // update(userId: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${userId} user`;
  // }

  async remove(userId: number) {
    return this.usersRepository.delete(userId);
  }

  async verifyUser(userId: number) {
    const existingUser = await this.findOne(userId);
    if (!existingUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return existingUser;
  }
}
