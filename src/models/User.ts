import mongoose, { Schema } from 'mongoose';
import slugs from 'slugs';
import bcrypt from 'bcryptjs';
import { composeWithMongoose } from 'graphql-compose-mongoose';

mongoose.Promise = global.Promise;

// 1. Defined the User Type
export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  dni: string;
  dniType: number; //! 1V | 2E | 3J | 4G
  slug: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  privilege: number; //! 0Client | 1SuperAdmin | 2Admin | ...
  commission?: number;
  createdAt: Date;
  updatedAt: Date;
};

// 2. Defined Mongoose Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Please provide a name',
      trim: true,
    },
    email: {
      type: String,
      required: 'Please provide a email',
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: 'Please provide a password',
      trim: true,
    },
    dni: {
      type: String,
      required: 'Please provide a dni',
      trim: true,
      unique: true,
    },
    dniType: {
      type: String,
      required: 'Please provide a dniType',
      trim: true,
      // enum: ['1', '2', '3', '4'],
    },
    slug: {
      type: String,
      trim: true,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Number,
    },
    privilege: {
      type: Number,
      required: 'Please provide a privilege',
    },
    commission: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(
  this: UserDocument,
  next: mongoose.HookNextFunction
) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugs(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const withSlugs = await (this as any).constructor.find({
    slug: slugRegEx,
  });
  if ((withSlugs as Array<any>).length) {
    this.slug = `${this.slug}-${withSlugs.length + 1}`;
  }
  next();
});

userSchema.pre('save', async function(
  this: UserDocument,
  next: mongoose.HookNextFunction
) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 3. Create Mongo Model and Graphql Schema
export const User = mongoose.model<UserDocument>('User', userSchema);
export const UserTC = composeWithMongoose(User);
