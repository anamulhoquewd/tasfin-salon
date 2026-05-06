// deprecated — replaced by frontend/app/api/ and frontend/models/
import mongoose, { Document, Schema } from 'mongoose';

export interface IReelSettings extends Document {
  src: string;
  autoplay: boolean;
  maxLoops: number;
  filename?: string;
}

const ReelSettingsSchema = new Schema<IReelSettings>(
  {
    src: { type: String, default: '' },
    autoplay: { type: Boolean, default: true },
    maxLoops: { type: Number, default: 2, min: 1, max: 3 },
    filename: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IReelSettings>('ReelSettings', ReelSettingsSchema);
