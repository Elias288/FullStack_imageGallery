import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { userName, password } = createUserDto;

    const existingUser = await this.findByName(userName);
    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ userName, password: hashedPassword });
    await this.usersRepository.save(user);
    return { userName, password: hashedPassword };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findByName(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
