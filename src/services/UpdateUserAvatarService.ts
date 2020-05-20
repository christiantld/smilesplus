import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    // verify if user ID is valid

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authrenticated users can change avatar.');
    }

    // Delete old avatar from file system
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFilExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFilExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    delete user.password;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
