import mongoose from 'mongoose';

const cartPageSchema = new mongoose.Schema(
  {
    cartMainHeading: { type: String, required: true },
    cartBackgroundImage: { type: String, required: true },
    productCardBorderColor: { type: String, required: true },
    productCardBackgroundColor: { type: String, required: true },
    productImageBorderColor: { type: String, required: true },
    productNameColor: { type: String, required: true },
    productNameActiveColor: { type: String, required: true },
    productPriceColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const CartPageSchema = mongoose.model('CartPageSchema', cartPageSchema);

export default CartPageSchema;
