import { Injectable, Inject, BadRequestException } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { Profile } from '../profiles/profile.entity';
import { UpdatedUserDto } from './dto/updated.user.dto';
import { UpdatedPasswordDto } from './dto/updated.password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      include: [
        {
          model: Profile,
        },
      ],
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async updateUserInfo(id: number, user: UpdatedUserDto) {
    return await this.userRepository.update(user, { where: { id } });
  }

  async updatePassword(
    id: number,
    { currentPassword, newPassword, confirmNewPassword }: UpdatedPasswordDto,
  ) {
    const user = await this.userRepository.findByPk(id);
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      throw new BadRequestException('Mot de passe incorrect');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Les mots de passe ne correspondent pas');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.userRepository.update(
      { password: hashedPassword },
      { where: { id } },
    );
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } });
  }

  //   async findProfilesByUserId(userId: number): Promise<Profile[]> {
  //     return await this.profileRepository.findAll<Profile>({ where: { userId } });
  //   }
}
