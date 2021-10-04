import mongoose from 'mongoose';

const membershipPageSchema = new mongoose.Schema(
  {
    membershipMainHeading: { type: String, required: true },
    membershipBackgroundImage: { type: String, required: true },
    membershipMainContent: { type: String, required: true },
    membershipFee: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const MembershipPageContent = mongoose.model(
  'MembershipPageContent',
  membershipPageSchema
);

export default MembershipPageContent;
