import { UserTC } from '../models';

const Mutation = {
  // Users
  createUser: UserTC.getResolver('createOne'),
  createManyUsers: UserTC.getResolver('createMany'),
  updateUserById: UserTC.getResolver('updateById'),
  updateUser: UserTC.getResolver('updateOne'),
  updateUsers: UserTC.getResolver('updateMany'),
  deleteUserById: UserTC.getResolver('removeById'),
  deleteUser: UserTC.getResolver('removeOne'),
  deleteUsers: UserTC.getResolver('removeMany'),
};

export default Mutation;
