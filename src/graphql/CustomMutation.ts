import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { schemaComposer } from 'graphql-compose';
import { UserTC, User } from '../models';

const signIn = schemaComposer.createResolver({
  name: 'signIn',
  type: UserTC.getType(),
  description: 'Login for a existing user in the db',
  kind: 'mutation',
  args: {
    email: 'String!',
    password: 'String!',
  },
  resolve: async ({ args, context }) => {
    const { email, password } = args;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User doesn't exists`);
    }
    const comparePassword = await bcrypt.compare(
      password as string,
      user.password
    );
    if (comparePassword) {
      const token = jwt.sign(
        {
          id: user._id,
          privilege: user.privilege,
          emission: new Date().toISOString(),
        },
        process.env.SECRET
      );
      context.res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      });
      context.setCookies.push({
        name: 'token',
        value: token,
        options: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
        },
      });
      return user;
    }
    throw new Error(`The password doesn't match`);
  },
});

const signUp = schemaComposer.createResolver({
  name: 'signUp',
  type: UserTC.getType(),
  description: 'Sign Up for a new user in the db',
  kind: 'mutation',
  args: {
    name: 'String!',
    email: 'String!',
    password: 'String!',
    dni: 'String!',
    dniType: 'Int!',
    privilege: 'Int!',
    commission: 'Float',
  },
  resolve: async ({ args, context }) => {
    const { email } = args;
    const userFromDB = await User.findOne({ email });
    if (userFromDB) {
      throw new Error(`This email is already register`);
    }
    const user = await User.create({ ...args });
    const token = jwt.sign(
      {
        id: user._id,
        privilege: user.privilege,
        emission: new Date().toISOString(),
      },
      process.env.SECRET
    );
    context.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
    });
    context.setCookies.push({
      name: 'token',
      value: token,
      options: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      },
    });
    return user;
  },
});

export default {
  signIn,
  signUp,
};
