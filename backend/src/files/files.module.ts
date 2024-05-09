import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { ImagesController } from './files.controller';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), UsersModule, TagModule],
  controllers: [ImagesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
