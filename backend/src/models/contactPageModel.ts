import mongoose from 'mongoose';

const contactPageSchema = new mongoose.Schema(
  {
    contactMainHeading: { type: String, required: true },
    contactHeroBackgroundImage: { type: String, required: true },
    contactMainBackgroundImage: { type: String, required: true },
    sectionOneText: { type: String, required: true },
    sectionOneImage: { type: String, required: true },
    locationFrame: { type: String, required: true },
    locationFrameBorderColor: { type: String, required: true },
    locationText: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const ContactPageContent = mongoose.model(
  'ContactPageContent',
  contactPageSchema
);

export default ContactPageContent;
