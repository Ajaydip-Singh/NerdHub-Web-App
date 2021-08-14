import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Boolean, required: true, default: 0 },
    isFeaturedEvent: { type: Boolean, default: false, required: true },
    country: { type: String, default: 'Kenya', required: true },
    city: { type: String, default: 'Nairobi', required: true },
    venue: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: String },
    registeredGuests: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    actualNumberOfGuests: { type: Number },
    capacity: { type: Number }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
