import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
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
    actualNumberOfGuests: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
