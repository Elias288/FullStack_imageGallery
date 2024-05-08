import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  // temporal
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: any) {
    const { user_id } = res.req.user;
    await this.userService.verifyUser(user_id);
    return res.send(await this.userService.findAll());
  }

  // @UseGuards(AuthGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @UseGuards(AuthGuard)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: any, @Param('id') id: string) {
    const { user_id } = res.req.user;
    await this.userService.verifyUser(user_id);
    return res.send(await this.userService.remove(+id));
  }
}
