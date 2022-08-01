import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  address: string;
  interests: Array<any>;
  fuel_tokens: number;
  near_balance: number;
  milestones: Array<any>;
  walkings: number;
  verifiedAt: Date;
}
