import mongoose, { Schema, Document } from "mongoose";

export interface IHealthAndDietary extends Document {
    dietaryPreferences: string[];
    healthProblems: string[];
    allergies: string[];
}

const HealthAndDietarySchema: Schema<IHealthAndDietary> = new Schema(
    {
        dietaryPreferences: { type: [String], default: [] },
        healthProblems: { type: [String], default: [] },
        allergies: { type: [String], default: [] },
    },
    { timestamps: true }
);

const HealthAndDietary = mongoose.model<IHealthAndDietary>(
    "HealthAndDietary",
    HealthAndDietarySchema
);
export default HealthAndDietary;
