import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    cardName: { type: String, required: true, unique: true },
    pageName: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    cardDisplayPrice: { type: String, required: true },
    pageDisplayPrice: { type: String, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isFeaturedProduct: { type: Boolean, required: true, default: false },
    borderColor: { type: String, required: true },
    borderHoverColor: { type: String, required: true },
    backgroundColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
