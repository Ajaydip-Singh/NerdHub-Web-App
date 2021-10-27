import mongoose from 'mongoose';

const membershipOrderSchema = new mongoose.Schema(
  {
    _id: String,
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

const MembershipOrder = mongoose.model('MembershipOrder', membershipOrderSchema);

export default MembershipOrder;
