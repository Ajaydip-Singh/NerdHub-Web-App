import mongoose from 'mongoose';

const comicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnailImage: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    backgroundColor: { type: String },
    borderColor: { type: String }
  },
  {
    timestamps: true
  }
);

const Comic = mongoose.model('Comic', comicSchema);

export default Comic;
