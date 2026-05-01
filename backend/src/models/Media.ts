import mongoose, { Document, Schema } from 'mongoose';

export type MediaType = 'image' | 'video';

export interface IMedia extends Document {
  filename: string;
  url: string;
  type: MediaType;
  size: number;
  mimeType: string;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMedia>('Media', MediaSchema);
