import mongoose from 'mongoose';

const eventPageSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, required: true },
    comingSoon: { type: Boolean, required: true, default: true },
    comingSoonText: { type: String, required: true },
    searchBarBorderColor: { type: String, required: true },
    searchBarInputBackgroundColor: { type: String, required: true },
    searchBarInputPlaceholderColor: { type: String, required: true },
    searchBarInputTextColor: { type: String, required: true },
    searchBarIconColor: { type: String, required: true },
    searchBarIconBackgroundColor: { type: String, required: true },
    searchBarIconBorderColor: { type: String, required: true },
    searchBarButtonColor: { type: String, required: true },
    searchBarButtonBorderColor: { type: String, required: true },
    searchBarButtonBackgroundColor: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const EventPageContent = mongoose.model('EventPageContent', eventPageSchema);

export default EventPageContent;
