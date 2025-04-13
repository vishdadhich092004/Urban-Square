import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  property?: mongoose.Types.ObjectId;
  lastMessage?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema: Schema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure there's only one conversation between the same participants
ConversationSchema.index({ participants: 1 });

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
