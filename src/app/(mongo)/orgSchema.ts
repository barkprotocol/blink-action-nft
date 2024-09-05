import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for the document
interface IOrgData extends Document {
  org: string;
  name: string;
  email: string;
  month: number;
  year: number;
  orgPubKey: string;
}

// Define the schema with validation
const OrgBlinkSchema: Schema<IOrgData> = new Schema({
  org: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email validation
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
    min: 1900, // Adjust min year as needed
    max: new Date().getFullYear(), // Ensure the year is not in the future
  },
  orgPubKey: { type: String, required: true },
});

// Add indexes if necessary
OrgBlinkSchema.index({ email: 1 }); // Index on email field
OrgBlinkSchema.index({ orgPubKey: 1 }); // Index on orgPubKey if used for querying

// Define any instance or static methods if needed
OrgBlinkSchema.methods.toJSON = function() {
  // Customize how the document is converted to JSON (e.g., exclude certain fields)
  const obj = this.toObject();
  delete obj.__v; // Exclude the version key
  return obj;
};

// Check if the model is already compiled
const OrgData: Model<IOrgData> = mongoose.models.OrgData || mongoose.model<IOrgData>('OrgData', OrgBlinkSchema);

export default OrgData;
