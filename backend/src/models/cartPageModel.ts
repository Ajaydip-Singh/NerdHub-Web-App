import mongoose from 'mongoose';

const cartPageSchema = new mongoose.Schema(
  {
    cartMainHeading: { type: String, required: true },
    cartBackgroundImage: { type: String, required: true },
    shippingInfoColor: { type: String, required: true },
    productCardBorderColor: { type: String, required: true },
    productCardBackgroundColor: { type: String, required: true },
    productImageBorderColor: { type: String, required: true },
    productNameColor: { type: String, required: true },
    productNameActiveColor: { type: String, required: true },
    productPriceColor: { type: String, required: true },
    tableBorderColor: { type: String, required: true },
    tableEvenRowBackgroundColor: { type: String, required: true },
    tableEvenRowTextColor: { type: String, required: true },
    tableOddRowBackgroundColor: { type: String, required: true },
    tableOddRowTextColor: { type: String, required: true },
    checkoutButtonTextColor: { type: String, required: true },
    checkoutButtonBackgroundColor: { type: String, required: true },
    checkoutButtonBorderColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const CartPageContent = mongoose.model('CartPageContent', cartPageSchema);

export default CartPageContent;
