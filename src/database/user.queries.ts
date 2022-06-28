
import { UserEntity } from '../entity/user.entity';
import { appDataSource } from '../database/data-source';

export default class UserQueries {

    async createUser(name: string) {
        const newUser = appDataSource.getRepository(UserEntity).create({name: name});
        const createdUser = await appDataSource.getRepository(UserEntity).save(newUser);
        return createdUser;
    }

}
