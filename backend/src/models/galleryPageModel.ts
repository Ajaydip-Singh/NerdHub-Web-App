import mongoose from 'mongoose';

const galleryPageSchema = new mongoose.Schema(
  {
    galleryMainHeading: { type: String, required: true },
    galleryBackgroundImage: { type: String, required: true },
    itemBorderColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const GalleryPageContent = mongoose.model(
  'GalleryPageContent',
  galleryPageSchema
);

export default GalleryPageContent;
