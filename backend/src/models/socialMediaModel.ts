import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema(
  {
    facebookEnabled: { type: String, required: true },
    facebookLink: { type: String, required: true },
    instagramEnabled: { type: String, required: true },
    instagramLink: { type: String, required: true },
    twitterEnabled: { type: String, required: true },
    twitterLink: { type: String, required: true },
    youtubeEnabled: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    tiktokEnabled: { type: String, required: true },
    tiktokLink: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const SocialMedia = mongoose.model('SocialMedia', socialMediaSchema);

export default SocialMedia;
