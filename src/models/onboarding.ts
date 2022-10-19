/** @format */

import { Schema, model } from "mongoose";
import { IOnboarding } from "../interfaces/Model/IOnboarding";

const OnboardingSchema = new Schema<IOnboarding>(
  {
    address: String,
  },
  {
    timestamps: true,
  }
);

// Export Onboarding model
const Onboarding = model<IOnboarding>("Onboarding", OnboardingSchema);

export default Onboarding;
