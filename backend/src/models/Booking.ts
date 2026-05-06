// deprecated — replaced by frontend/app/api/ and frontend/models/
import mongoose, { Document, Schema } from 'mongoose';

export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'block';
export type BookingChannel = 'WhatsApp' | 'Form' | 'Walk-in' | 'Phone call';

export interface IBooking extends Document {
  clientName: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: BookingStatus;
  channel: BookingChannel;
  price?: string;
  notes?: string;
  rawMessage?: string;
  parseConfidence?: number;
  autoReply?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    clientName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    service: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, default: '1h' },
    status: { type: String, enum: ['pending', 'confirmed', 'declined', 'block'], default: 'pending' },
    channel: { type: String, enum: ['WhatsApp', 'Form', 'Walk-in', 'Phone call'], default: 'WhatsApp' },
    price: { type: String },
    notes: { type: String },
    rawMessage: { type: String },
    parseConfidence: { type: Number, min: 0, max: 1 },
    autoReply: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
