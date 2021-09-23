import mongoose from 'mongoose';

const homePageSchema = new mongoose.Schema(
  {
    sliderPageOneBackgroundImage: { type: String, required: true },
    sliderPageTwoBackgroundImage: { type: String, required: true },
    sliderPageThreeBackgroundImage: { type: String, required: true },
    sliderPageOneContent: { type: String, required: true },
    sliderPageTwoContent: { type: String, required: true },
    sliderPageThreeContent: { type: String, required: true },
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
