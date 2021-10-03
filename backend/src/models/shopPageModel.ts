import mongoose from 'mongoose';

const shopPageSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const ShopPageContent = mongoose.model('ShopPageContent', shopPageSchema);

export default ShopPageContent;
