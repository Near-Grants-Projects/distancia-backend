/** @format */

import { Document, Types } from 'mongoose';
import { AdsStatus, MediaType } from '../../constants/status.const';

export interface IAds extends Document {
  _id: Types.ObjectId;
  ownerId: string;
  mediaLink: string;
  mediaType: MediaType;
  interestId: string;
  description: string;
  status: AdsStatus;
  duration: number;
}
