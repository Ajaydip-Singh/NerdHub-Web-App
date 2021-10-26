import mongoose from 'mongoose';

const eventOrderSchema = new mongoose.Schema(
  {
    _id: String,
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
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
    paidAt: { type: Date }
  },
  {
    timestamps: true
  }
);

const EventOrder = mongoose.model('EventOrder', eventOrderSchema);

export default EventOrder;
