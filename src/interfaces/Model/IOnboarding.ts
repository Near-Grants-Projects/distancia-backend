/** @format */

import { Document, Types } from "mongoose";

export interface IOnboarding extends Document {
  _id: Types.ObjectId;
  address: string;
}
