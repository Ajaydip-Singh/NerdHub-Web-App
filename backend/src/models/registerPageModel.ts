import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema(
  {
    mainHeading: { type: String, required: true },
    mainBackgoundImage: { type: String, required: true },
    mainBackgoundColor: { type: String, required: true },
    inputBorderColor: { type: String, required: true, default: '#50d450' },
    inputBackgroundColor: { type: String, required: true, default: '#50d450' },
    inputTextColor: { type: String, required: true, default: '#50d450' },
    existingAccountText: { type: String, required: true, default: '#50d450' },
    registerButtonBorderColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    registerButtonBackgroundColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    registerButtonTextColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    signInLinkBorderColor: { type: String, required: true, default: '#50d450' },
    signInLinkBackgroundColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    signInLinkTextColor: { type: String, required: true, default: '#50d450' }
  },
  {
    timestamps: true
  }
);

const Register = mongoose.model('Register', registerSchema);

export default Register;
