import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    FilesModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
