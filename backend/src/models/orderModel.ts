import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    _id: String,
    orderItems: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        thumbnailImage: { type: String, required: true }
      }
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      default: 'PesaPal',
      required: true
    },
    paymentResult: {
      reference: { type: String },
      transaction_id: { type: String },
      status: { type: String }
    },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
