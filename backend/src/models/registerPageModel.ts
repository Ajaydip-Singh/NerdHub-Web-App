import mongoose from 'mongoose';

const registerPageSchema = new mongoose.Schema(
  {
    mainHeading: { type: String, required: true },
    mainBackgroundImage: { type: String, required: true },
    mainBackgroundColor: { type: String, required: true },
    inputBorderColor: { type: String, required: true, default: '#50d450' },
    inputBackgroundColor: { type: String, required: true, default: '#50d450' },
    inputTextColor: { type: String, required: true, default: '#50d450' },
    newAccountText: { type: String, required: true, default: '#50d450' },
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
    signUpLinkBorderColor: { type: String, required: true, default: '#50d450' },
    signUpLinkBackgroundColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    signUpLinkTextColor: { type: String, required: true, default: '#50d450' }
  },
  {
    timestamps: true
  }
);

const RegisterPageContent = mongoose.model(
  'RegisterPageContent',
  registerPageSchema
);

export default RegisterPageContent;
