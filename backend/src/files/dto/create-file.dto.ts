import { User } from 'src/users/entities/user.entity';

export class CreateFileDto {
  path: string;
  user: User;
}
