import { Document, Types } from 'mongoose';

export interface IPasswordReset extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
}
