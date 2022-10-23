import mongoose, { Schema, model } from 'mongoose';
import { AdsStatus, MediaType } from '../constants/status.const';
import { IAds } from '../interfaces/Model/IAds';

const AdsSchema = new Schema<IAds>(
  {
    ownerId: {
      type: String,
      required: true,
    },
    mediaLink: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: Object.values(MediaType),
      default: MediaType.MP4,
    },
    interestId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(AdsStatus),
      default: AdsStatus.ACTIVE,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export Ads model
const Ads = model<IAds>('Ads', AdsSchema);

export default Ads;
