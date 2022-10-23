/** @format */

import { Document, Types } from 'mongoose';
import { InterestStatus } from '../../constants/status.const';

export interface IInterest extends Document {
  _id: Types.ObjectId;
  name: string;
  status: InterestStatus;
}
