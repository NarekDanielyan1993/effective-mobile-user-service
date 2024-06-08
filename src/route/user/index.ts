import { USER_API } from 'constant/api';
import UserController from 'controller/user';
import express, { Router } from 'express';
import UserRepository from 'repository/user';
import UserService from 'service/user';
import { validateRequest } from 'utils/helper';
import { userValidationSchema } from 'utils/validation/user';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes: Router = express.Router();

userRoutes.get(USER_API.GET_ALL, userController.getUsers);

userRoutes.post(
    USER_API.CREATE,
    validateRequest(userValidationSchema),
    userController.createUser,
);

userRoutes.put(
    USER_API.UPDATE,
    validateRequest(userValidationSchema),
    userController.updateUser,
);

export default userRoutes;
