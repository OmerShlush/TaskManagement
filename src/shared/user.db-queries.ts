import { User } from '../entity/user.entity';
import { appDataSource } from './data-source';

const addUser = async (name: string) => {
    const newUser = appDataSource.getRepository(User).create({name: name});
    const results = await appDataSource.getRepository(User).save(newUser);
    return results;
}

export { addUser };