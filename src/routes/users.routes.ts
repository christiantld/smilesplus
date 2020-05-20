import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (req, res) => {
  res.json({ ok: true });
});

export default usersRouter;
