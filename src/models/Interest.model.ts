/** @format */

import { Schema, model } from "mongoose";
import { IInterest } from '../interfaces/Model/IInterest';

const InterestSchema = new Schema<IInterest>(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

// Export Interest model
const Interest = model<IInterest>('Interest', InterestSchema);

export default Interest;
