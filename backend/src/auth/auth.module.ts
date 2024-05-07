import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule.register(jwtConstant)],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
