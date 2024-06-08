/* eslint-disable max-lines */
import { NextFunction, Request, Response } from 'express';
import rabbitmq from 'lib/rabbitmq';
import { IUser, IUserService } from 'types/user';
export default class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userData: IUser = req.body;

            const user = await this.userService.createUser({
                name: userData.name,
            });

            await rabbitmq.sendMessage(
                JSON.stringify({ type: 'CREATE', user }),
            );

            res.status(200).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userData: IUser = req.body;

            const id = req.params.id;

            const updatedUser = await this.userService.updateUser(Number(id), {
                name: userData.name,
            });

            await rabbitmq.sendMessage(
                JSON.stringify({ type: 'UPDATE', user: updatedUser }),
            );

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    };
}
