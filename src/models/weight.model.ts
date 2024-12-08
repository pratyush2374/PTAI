import mongoose, { Schema, Document } from "mongoose";

export interface IWeight extends Document {
    date: string;
    weight: number;
}

export const WeightSchema: Schema<IWeight> = new Schema(
    {
        date: { type: String, required: true },
        weight: { type: Number, required: true },
    },
    { _id: false }
);

const Weight = mongoose.model<IWeight>("Weight", WeightSchema);
export default Weight;
