import mongoose from 'mongoose'
const { Schema } = mongoose

export const PiIterationSchema = new Schema(
  {
    decimals: { type: Number },
    value: { type: String },
    createdAt: { type: Date },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String },
  },
  { collection: 'piIterations' },
)
