import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  category: string;
  icon: string;
  duration: string;
  price: string;
  desc: string;
  order: number;
  active: boolean;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: 'sparkles' },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
