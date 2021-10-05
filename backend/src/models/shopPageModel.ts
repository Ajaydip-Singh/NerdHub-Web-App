import mongoose from 'mongoose';

const shopPageSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, required: true },
    comingSoonText: { type: String, required: true },
    comingSoon: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true
  }
);

const ShopPageContent = mongoose.model('ShopPageContent', shopPageSchema);

export default ShopPageContent;
