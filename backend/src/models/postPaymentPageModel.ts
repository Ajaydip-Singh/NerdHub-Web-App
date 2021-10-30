import mongoose from 'mongoose';

const postPaymentPageSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String },
    mainText: { type: String },
    infoText: { type: String }
  },
  {
    timestamps: true
  }
);

const PostPaymentPageContent = mongoose.model(
  'PostPaymentPageContent',
  postPaymentPageSchema
);

export default PostPaymentPageContent;
