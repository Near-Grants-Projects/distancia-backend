/** @format */

import { Document, Types } from "mongoose";

export interface IAds extends Document {
  _id: Types.ObjectId;
  owner_id: string;
  media_link: string;
  media_type: string;
  interests: [];
}
