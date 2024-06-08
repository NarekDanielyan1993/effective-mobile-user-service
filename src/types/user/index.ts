import { Prisma } from '@prisma/client';

export interface IUser {
    name: string;
}

export interface IUserResponse extends IUser {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserService {
    createUser(userData: Prisma.UserCreateInput): Promise<IUserResponse>;
    updateUser(
        id: number,
        userData: Prisma.UserUpdateInput,
    ): Promise<IUserResponse | null>;
    getAllUsers(): Promise<IUserResponse[]>;
}
