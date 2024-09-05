import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for the document
export interface IUserBlink extends Document {
  name: string;
  orgId: string;
  email: string;
  amount: number;
  duration: 'month' | 'year';
  userPubKey: string; // Adjusted field name to camelCase
}

// Define the schema with validation
const UserBlinkSchema: Schema<IUserBlink> = new Schema({
  name: { type: String, required: true },
  orgId: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email validation
  },
  amount: { type: Number, required: true, min: 0 }, // Ensure amount is non-negative
  duration: { type: String, enum: ['month', 'year'], required: true },
  userPubKey: { type: String, required: true }, // Adjusted field name to camelCase
});

// Add indexes if necessary
UserBlinkSchema.index({ email: 1 }); // Example index on email
UserBlinkSchema.index({ userPubKey: 1 }); // Index on userPubKey if used for querying

// Define any instance or static methods if needed
UserBlinkSchema.methods.toJSON = function() {
  // Customize how the document is converted to JSON (e.g., exclude certain fields)
  const obj = this.toObject();
  delete obj.__v; // Exclude the version key
  return obj;
};

// Check if the model is already compiled
const UserBlinkModel: Model<IUserBlink> = mongoose.models.UserBlink || mongoose.model<IUserBlink>('UserBlink', UserBlinkSchema);

export default UserBlinkModel;
