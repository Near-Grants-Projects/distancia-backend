import { Schema, model } from 'mongoose';
import { IPasswordReset } from '../interfaces/Model/IPasswordReset';

// Create the password-reset schema
const PasswordResetSchema = new Schema<IPasswordReset>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// Create and export password-reset model
const PasswordResetModel = model<IPasswordReset>(
  'PasswordResets',
  PasswordResetSchema
);

export default PasswordResetModel;
