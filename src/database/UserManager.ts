import UserQueries from './user.queries';

export default class UserManager {

    userQueries = new UserQueries();

    addUser = async (name: string) => {
        return await this.userQueries.createUser(name);
    }

}
