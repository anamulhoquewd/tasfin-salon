import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  category: string;
  tone: string;
  imageUrl?: string;
  order: number;
  active: boolean;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    category: { type: String, required: true, trim: true },
    tone: { type: String, default: 'blush' },
    imageUrl: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
