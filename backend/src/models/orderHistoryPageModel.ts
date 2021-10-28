import mongoose from 'mongoose';

const orderHistoryPageSchema = new mongoose.Schema(
  {
    orderHistoryMainHeading: { type: String, required: true },
    orderHistoryBackgroundImage: { type: String, required: true },
    noOrdersAvailable: { type: String, required: true },
    ordersMainHeading: { type: String, required: true },
    eventsMainHeading: { type: String, required: true },
    tableBorderColor: { type: String, required: true },
    tableEvenRowBackgroundColor: { type: String, required: true },
    tableEvenRowTextColor: { type: String, required: true },
    tableOddRowBackgroundColor: { type: String, required: true },
    tableOddRowTextColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const OrderHistoryPageContent = mongoose.model(
  'OrderHistoryPageContent',
  orderHistoryPageSchema
);

export default OrderHistoryPageContent;
