import mongoose, { Schema, Document } from "mongoose";

export interface IUserPreferences extends Document {
    activityLevel: string;
    preferredExerciseType: string[];
    exerciseExperience: string;
    workoutDuration: string;
    exerciseFrequency: string;
    macronutrientPreferences: string[];
    fitnessGoals: string[];
    pace: string;
    availableEquipments: string[];
}

const UserPreferencesSchema: Schema<IUserPreferences> = new Schema(
    {
        activityLevel: { type: String, required: true },
        preferredExerciseType: { type: [String], default: [] },
        exerciseExperience: { type: String, required: true },
        workoutDuration: { type: String, required: true },
        exerciseFrequency: { type: String, required: true },
        macronutrientPreferences: { type: [String], default: [] },
        fitnessGoals: { type: [String], default: [] },
        pace: { type: String, required: true },
        availableEquipments: { type: [String], default: [] },
    },
    { timestamps: true }
);

const UserPreferences = mongoose.model<IUserPreferences>(
    "UserPreferences",
    UserPreferencesSchema
);
export default UserPreferences;
