import mongoose from 'mongoose';

const productPageSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const ProductPageContent = mongoose.model(
  'ProductPageContent',
  productPageSchema
);

export default ProductPageContent;
