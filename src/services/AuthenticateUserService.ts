import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import User from '../models/User';
import authConfig from '../config/auth';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    // Validation email and password

    if (!user) {
      throw new Error('Incorrect E-mail/Password combination.');
    }

    // user.password = encrypted password
    // password - raw password
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect E-mail/Password combination.');
    }

    // Remover paraum arquivo .env

    const { secretKey, expiresIn } = authConfig.jwt;

    const token = sign({ name: user.name }, secretKey, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
