import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false, unique: false },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false, required: true },
    confirmationCode: { type: String, unique: true },
    isGoogle: {
      type: Boolean,
      default: false,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
