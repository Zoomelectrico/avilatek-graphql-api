import jwt from 'jsonwebtoken';
import { schemaComposer } from 'graphql-compose';
import { UserTC, User } from '../models';

const me = schemaComposer.createResolver({
  name: 'me',
  type: UserTC.getType(),
  description: 'Get the logged in user',
  kind: 'query',
  args: {},
  resolve: async ({ args, context }) => {
    const token = context.req.cookies['token'];
    if (!token) {
      return null;
    }
    const payload = jwt.decode(token as string);
    const user = await User.findById((payload as { id: string }).id);
    if (!user) {
      throw new Error(`User doesn't exists`);
    }
    return user;
  },
});

export default {
  me,
};
