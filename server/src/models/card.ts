import { Schema, model, Document } from 'mongoose';

interface ICard extends Document {
  imagePath: string;
  classificationResult: string;
  accuracy: number;
  createdAt: Date;
}

const CardSchema = new Schema<ICard>({
  imagePath: { type: String, required: true },
  classificationResult: { type: String, required: true },
  accuracy: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});


export const CardModel = model<ICard>('Card', CardSchema);
