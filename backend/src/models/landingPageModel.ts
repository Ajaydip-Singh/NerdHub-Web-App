import mongoose from 'mongoose';

const landingPageSchema = new mongoose.Schema(
  {
    showVideo: { type: Boolean, required: true, default: true },
    videoUrl: { type: String },
    mobileVideoUrl: { type: String }
  },
  {
    timestamps: true
  }
);

const LandingPageContent = mongoose.model(
  'LandingPageContent',
  landingPageSchema
);

export default LandingPageContent;
