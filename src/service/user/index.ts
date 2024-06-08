import { Prisma } from '@prisma/client';
import UserRepository from 'repository/user';
import { IUserResponse, IUserService } from 'types/user';

class UserService implements IUserService {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public createUser = async (
        userData: Prisma.UserCreateInput,
    ): Promise<IUserResponse> => {
        const createdUser: IUserResponse = await this.repository.create({
            ...userData,
        });
        return createdUser;
    };

    public updateUser = async (
        id: number,
        userData: Prisma.UserUpdateInput,
    ): Promise<IUserResponse | null> => {
        const updatedUser = await this.repository.updateById(id, {
            ...userData,
        });
        return updatedUser;
    };

    async getAllUsers(): Promise<IUserResponse[]> {
        const updatedUser = await this.repository.findMany();
        return updatedUser;
    }
}

export default UserService;
