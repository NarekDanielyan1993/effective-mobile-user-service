import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { USER_ERROR_MESSAGES } from 'constant/error';
import prismaAdapter from 'lib/db';
import { InternalServerError } from 'lib/error';
import { IUserResponse } from 'types/user';

class UserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async create(queryData: Prisma.UserCreateInput): Promise<IUserResponse> {
        try {
            return (await this.prisma.user.create({
                data: {
                    ...queryData,
                },
            })) as IUserResponse;
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.CREATE_USER);
        }
    }

    async updateById(
        id: number,
        userData: Prisma.UserUpdateInput,
    ): Promise<IUserResponse | null> {
        try {
            return await this.prisma.user.update({
                where: {
                    id,
                },
                data: userData,
            });
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.UPDATE_USER);
        }
    }

    async findMany(userData?: Prisma.UserWhereInput): Promise<IUserResponse[]> {
        try {
            return await this.prisma.user.findMany({
                where: {
                    ...userData,
                },
            });
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.GET_USERS);
        }
    }
}

export default UserRepository;
