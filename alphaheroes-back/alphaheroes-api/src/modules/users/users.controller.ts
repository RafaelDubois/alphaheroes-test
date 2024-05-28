import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
// import { UserDto } from './dto/user.dto';
import { UpdatedUserDto } from './dto/updated.user.dto';
import { UpdatedPasswordDto } from './dto/updated.password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOneById(Number(id));
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() user: UserDto,
  // ): Promise<string> {
  //   const updateUser: Partial<UserEntity> = { ...user };

  //   if (user.password) {
  //     // If a password is provided, hash it before updating
  //     const hashedPassword = await bcrypt.hash(user.password, 10);
  //     updateUser.password = hashedPassword;
  //     await this.usersService.updateUserInfo(Number(id), updateUser as UserDto);
  //     return "Les informations de l'utilisateur et le mot de passe ont bien été modifié";
  //   }

  //   await this.usersService.updateUserInfo(Number(id), updateUser as UserDto);
  //   return "Les informations de l'utilisateur ont bien été modifié";
  // }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdatedUserDto,
  ): Promise<string> {
    await this.usersService.updateUserInfo(Number(id), user);
    return "Les informations de l'utilisateur ont bien été modifié";
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() password: UpdatedPasswordDto,
  ): Promise<string> {
    await this.usersService.updatePassword(Number(id), password);
    return 'Le mot de passe a bien été modifié';
  }

  //   @UseGuards(AuthGuard('jwt'))
  //   @Delete(':id')
  //   async remove(@Param('id') id: string): Promise<void> {
  //     return await this.usersService.remove(Number(id));
  //   }
}
