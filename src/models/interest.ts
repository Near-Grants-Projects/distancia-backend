/** @format */

import { Schema, model } from 'mongoose';
import { InterestStatus } from '../constants/status.const';
import { IInterest } from '../interfaces/Model/IInterest';

const InterestSchema = new Schema(
  {
    name: String,
    status: {
      type: String,
      required: true,
      enum: Object.values(InterestStatus),
      default: InterestStatus.ACTIVE,
    },
    url: String,
  },
  {
    timestamps: true,
  }
);

// Export Interest model
const Interest = model<IInterest>('Interest', InterestSchema);

InterestSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default Interest;
