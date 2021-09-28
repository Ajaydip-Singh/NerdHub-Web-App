import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema(
  {
    backgroundColor: { type: String, required: true },
    address: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phone: { type: String, required: true },
    footerHeaderColor: { type: String, required: true },
    footerLinkColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;
