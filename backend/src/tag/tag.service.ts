import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag-dto';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UpdateTagDto } from './dto/update-tag-dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private readonly userService: UsersService,
  ) {}

  async create(userId: number, createTagDto: CreateTagDto) {
    const { name, type } = createTagDto;
    await this.userService.verifyUser(userId);

    const existTag = await this.findByName(name);
    if (existTag) {
      throw new ConflictException();
    }

    const tag = new Tag();
    tag.name = name;
    tag.type = type;

    await this.tagRepository.save(tag);
    return tag;
  }

  async findAll(userId: number) {
    await this.userService.verifyUser(userId);
    return this.tagRepository.find();
  }

  findById(tagId: number) {
    return this.tagRepository.findOneBy({ tagId });
  }

  findByName(name: string) {
    return this.tagRepository.findOneBy({ name });
  }

  async update(userId: number, tagId: number, updateTagDto: UpdateTagDto) {
    await this.userService.verifyUser(userId);
    return await this.tagRepository.update(tagId, updateTagDto);
  }

  async remove(userId: number, tagId: number) {
    await this.userService.verifyUser(userId);
    return await this.tagRepository.delete(tagId);
  }
}
