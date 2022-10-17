import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/Model/IUser';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import config from '../config';

import * as crypto from 'crypto';
import PasswordResetModel from './password-reset.model';

// Create the model schema & register your custom methods here
export interface IUserModel extends IUser {
  comparePassword(password: string): Promise<boolean>;
  generateJWT(): string;
  generatePasswordReset(): object;
  generateVerificationToken(): void;
}

// Create the user schema
const UserSchema = new Schema<IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    address: String,
    interests: [],
    fuel_tokens: Number,
    near_balance: Number,
    milestones: [],
    verifiedAt: Date,
    walkings: Number,
  },
  {
    timestamps: true,
  }
);

/**
 * Hash user's password before user is created.
 */
UserSchema.pre<IUserModel>('save', async function (_next) {
  if (!this.isModified('password')) return _next();
  try {
    this.password = await argon2.hash(this.password);
    return _next();
  } catch (_err) {
    if (_err) return _next(_err);
  }
});

/**
 * Compares the user's password with the request password.
 * @param  {string} password The user password.
 * @return {boolean} If password is correct returns true, else false.
 */
UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return argon2.verify(this.password, password);
};

/**
 * Generates JWT token for user.
 * @return {string} The generated user JWT.
 */
UserSchema.methods.generateJWT = function (): string {
  const payload = {
    id: this._id,
    email: this.email,
  };

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_DURATION,
  });
};

/**
 * Generates payload for user password resets.
 * @return {object} The create user password reset data.
 */
UserSchema.methods.generatePasswordReset = async function (): Promise<object> {
  const payload = {
      userId: this._id,
      expiresAt: Date.now() + 3600000, //expires in an hour
    },
    token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_DURATION,
    });

  const query = { userId: payload.userId },
    options = { upsert: true, new: true };

  // Find the document
  await PasswordResetModel.findOneAndUpdate(query, { ...payload, token }, options);

  return new PasswordResetModel({ ...payload, token });
};

/**
 * Generates user verification token.
 * Sets the generated token to user token in database.
 */
UserSchema.methods.generateVerificationToken = function (): void {
  this.verificationToken = crypto.randomBytes(20).toString('hex');
};

// Create and export user model
const User = model<IUserModel>('Users', UserSchema);

export default User;
