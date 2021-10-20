import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnailImage: { type: String, required: true },
    images: { type: [String] },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    isFeaturedEvent: { type: Boolean, default: false, required: true },
    country: { type: String, default: 'Kenya', required: true },
    city: { type: String, default: 'Nairobi', required: true },
    venue: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: false, required: true },
    capacity: { type: Number, default: 10, required: true },
    registeredGuests: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    actualNumberOfGuests: { type: Number, default: 0 },
    backgroundColor: { type: String },
    borderColor: { type: String }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model<any>('Event', eventSchema);

export default Event;
