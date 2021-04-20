import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Role } from '../role/entities/role.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserEmailInput } from './dto/update-user-email.input';
import { UpdateUserNameInput } from './dto/update-user-name.input';
import { UpdateUserPasswordInput } from './dto/update-user-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {
    userRepository.find().then((users) => {
      console.log(users);
    });
  }

  async create(createUserInput: CreateUserInput) {
    const newUser = new User();
    newUser.name = createUserInput.name;
    newUser.email = createUserInput.email;
    newUser.password = createUserInput.password;
    const defaultRole = await this.roleRepository.findOne(0, { cache: true });
    if (!defaultRole) {
      throw new NotFoundException();
    }
    newUser.role = defaultRole;
    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) {
      throw new BadRequestException();
    }
    const newProfile = new Profile();
    newProfile.user = savedUser;
    const savedProfile = await this.profileRepository.save(newProfile);
    savedUser.profile = savedProfile;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  updateName(id: number, updateUserNameInput: UpdateUserNameInput) {
    return `This action updates a #${id} user`;
  }

  updateEmail(id: number, updateUserEmailInput: UpdateUserEmailInput) {
    return `This action updates a #${id} user`;
  }

  updatePassword(id: number, updateUserPasswordInput: UpdateUserPasswordInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
