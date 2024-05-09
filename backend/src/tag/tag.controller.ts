import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTagDto } from './dto/create-tag-dto';
import { UpdateTagDto } from './dto/update-tag-dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Res() res: any, @Body() createTagDto: CreateTagDto) {
    const { userId } = res.req.user;
    return res.send(await this.tagService.create(userId, createTagDto));
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: any) {
    const { userId } = res.req.user;
    return res.send(await this.tagService.findAll(userId));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Res() res: any,
    @Param('id') tagId: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const { userId } = res.req.user;
    return res.send(await this.tagService.update(userId, +tagId, updateTagDto));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: any, @Param('id') tagId: string) {
    const { userId } = res.req.user;
    return res.send(await this.tagService.remove(userId, +tagId));
  }
}
