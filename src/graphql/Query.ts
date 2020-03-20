import { UserTC } from '../models';

const Query = {
  // User
  userById: UserTC.getResolver('findById'),
  usersById: UserTC.getResolver('findByIds'),
  user: UserTC.getResolver('findOne'),
  users: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
};

export default Query;
