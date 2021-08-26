import mongoose from 'mongoose';

const aboutPageSchema = new mongoose.Schema(
  {
    aboutMainHeading: { type: String, required: true },
    aboutBackgroundImage: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoThumbnail: { type: String, required: true },
    videoBorderColor: { type: String, required: true },
    videoBoxShadowColor: { type: String, required: true },
    sectionOneHeading: { type: String, required: true },
    sectionOneText: { type: String, required: true },
    sectionOneImage: { type: String, required: true },
    sectionTwoHeading: { type: String, required: true },
    sectionTwoText: { type: String, required: true },
    sectionTwoImage: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const AboutPageContent = mongoose.model('AboutPageContent', aboutPageSchema);

export default AboutPageContent;
