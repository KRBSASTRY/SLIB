import mongoose from "mongoose";

const LibrarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  os: { type: [String], required: true }, // Array for multiple OS support
  version: { type: String, required: true },
  cost: { type: String, default: "Free" },
  dependencies: { type: [String], default: [] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Library", LibrarySchema);
