import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { UsersService } from 'src/users/users.service';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly userService: UsersService,
    private readonly tagService: TagService,
  ) {}

  async create(user_id: number, createImageDto: CreateFileDto) {
    const { path } = createImageDto;

    const usuario = await this.userService.verifyUser(user_id);

    const existImage = await this.findByPath(path, user_id);
    if (existImage) {
      throw new ConflictException();
    }

    const image = new File();
    image.path = path;
    image.user = usuario;

    await this.fileRepository.save(image);
    return { ...createImageDto, userId: user_id };
  }

  async findAll(userId: number) {
    await this.userService.verifyUser(userId);
    const res = await this.fileRepository.find({
      relations: { tags: true },
      where: { userId },
    });
    if (!res) return [];
    return res;
  }

  async findOne(fileId: number, userId: number) {
    await this.userService.verifyUser(userId);
    return this.fileRepository.findOne({
      where: { userId, fileId },
      relations: { tags: true },
    });
  }

  async findByPath(path: string, userId: number) {
    await this.userService.verifyUser(userId);
    return await this.fileRepository.findOne({
      where: { userId, path },
      relations: { tags: true },
    });
  }

  async pushTag(userId: number, tagId: number, fileId: number) {
    const tag = await this.tagService.findById(tagId);
    const file = await this.findOne(fileId, userId);

    return await this.fileRepository
      .createQueryBuilder()
      .relation(File, 'tags')
      .of(file)
      .add(tag);
  }

  async removeTag(userId: number, tagId: number, fileId: number) {
    const tag = await this.tagService.findById(tagId);
    const file = await this.findOne(fileId, userId);

    return await this.fileRepository
      .createQueryBuilder()
      .relation(File, 'tags')
      .of(file)
      .remove(tag);
  }

  async update(fileId: number, updateImageDto: UpdateFileDto, userId: number) {
    await this.userService.verifyUser(userId);
    return this.fileRepository.update(fileId, updateImageDto);
  }

  async remove(fileId: number, userId: number) {
    await this.userService.verifyUser(userId);
    return this.fileRepository.delete(fileId);
  }
}
