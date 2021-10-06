import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    publicId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tags: { type: [String], required: true },
    imageBorderColor: { type: String, required: true, default: '#50d450' },
    description: { type: String, default: 'sample description' },
    descriptionBackgroundColor: {
      type: String,
      default: '#000',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
