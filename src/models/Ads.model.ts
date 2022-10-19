import mongoose, { Schema, model } from 'mongoose';
import { IAds } from '../interfaces/Model/IAds';

const AdsSchema = new Schema<IAds>(
  {
    owner_id: String,
    media_link: String,
    media_type: String,
    interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' }],
  },
  {
    timestamps: true,
  }
);

// Export Ads model
const Ads = model<IAds>('Ads', AdsSchema);

export default Ads;
