import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per property
ReviewSchema.index({ property: 1, user: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', ReviewSchema);
