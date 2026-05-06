import mongoose, { Document, Schema } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);
