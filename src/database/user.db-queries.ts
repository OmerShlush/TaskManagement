import { UserEntity } from '../entity/user.entity';
import { appDataSource } from './data-source';

export default class UserManager {

    addUser = async (name: string) => {
        const newUser = appDataSource.getRepository(UserEntity).create({name: name});
        const results = await appDataSource.getRepository(UserEntity).save(newUser);
        return results;
    }
}
