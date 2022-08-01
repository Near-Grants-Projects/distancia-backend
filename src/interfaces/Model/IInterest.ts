/** @format */

import { Document, Types } from "mongoose";

export interface IInterest extends Document {
  _id: Types.ObjectId;
  name: string;
}
