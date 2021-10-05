import mongoose from 'mongoose';

const productPageSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, required: true },
    productImageBorderColor: { type: String, required: true },
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

const ProductPageContent = mongoose.model(
  'ProductPageContent',
  productPageSchema
);

export default ProductPageContent;
