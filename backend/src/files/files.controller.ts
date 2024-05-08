import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() res: any, @Body() createImageDto: CreateFileDto) {
    const { userId } = res.req.user;
    return res.send(await this.filesService.create(userId, createImageDto));
  }

  @UseGuards(AuthGuard)
  @Get('path')
  async findByPath(@Res() res: any, @Body() createImageDto: CreateFileDto) {
    const { userId } = res.req.user;
    return res.send(
      await this.filesService.findByPath(createImageDto.path, userId),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Res() res: any, @Param('id') id: string) {
    const { userId } = res.req.user;
    return res.send(await this.filesService.findOne(+id, userId));
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: any) {
    const { userId } = res.req.user;
    return res.send(await this.filesService.findAll(userId));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Res() res: any,
    @Param('id') id: string,
    @Body() updateImageDto: UpdateFileDto,
  ) {
    const { userId } = res.req.user;
    return res.send(
      await this.filesService.update(+id, updateImageDto, userId),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: any, @Param('id') id: string) {
    const { userId } = res.req.user;
    return res.send(await this.filesService.remove(+id, userId));
  }
}
