import mongoose from 'mongoose';

const loginPageSchema = new mongoose.Schema(
  {
    mainHeading: { type: String, required: true },
    mainBackgroundImage: { type: String, required: true },
    mainBackgroundColor: { type: String, required: true },
    inputBorderColor: { type: String, required: true, default: '#50d450' },
    inputBackgroundColor: { type: String, required: true, default: '#50d450' },
    inputTextColor: { type: String, required: true, default: '#50d450' },
    newAccountText: { type: String, required: true, default: '#50d450' },
    loginButtonBorderColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    loginButtonBackgroundColor: {
      type: String,
      required: true,
      default: '#50d450'
    },
    loginButtonTextColor: { type: String, required: true, default: '#50d450' },
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

const LoginPageContent = mongoose.model('LoginPageContent', loginPageSchema);

export default LoginPageContent;
