import mongoose from 'mongoose';

const homePageSchema = new mongoose.Schema(
  {
    videoHeading: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoThumbnail: { type: String, required: true },
    videoBackgroundImage: { type: String, required: true },
    videoBorderColor: { type: String, required: true },
    videoBoxShadowColor: { type: String, required: true },
    eventBackgroundImage: { type: String, required: true },
    contactBackgroundColor: { type: String, required: true },
    contactText: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const HomePageContent = mongoose.model('HomePageContent', homePageSchema);

export default HomePageContent;
