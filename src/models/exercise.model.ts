import mongoose, { Schema, Document } from "mongoose";

export interface IExercise extends Document {
    exerciseName: string;
    exerciseType: string[];
    primaryMuscleTarget: string;
    secondaryMuscleTarget?: string;
    exerciseDuration: number;
    equipmentRequired: boolean;
    calorieBurn: number;
    beginnerSets: number;
    beginnerReps: number;
    intermediateSets: number;
    intermediateReps: number;
    expertSets: number;
    expertReps: number;
    restTime: number;
    adviseWhenDoingExercise: string;
}

const ExerciseSchema = new Schema<IExercise>({
    exerciseName: { type: String, required: true },
    exerciseType: { type: [String], required: true },
    primaryMuscleTarget: { type: String, required: true },
    secondaryMuscleTarget: { type: String },
    exerciseDuration: { type: Number, required: true },
    equipmentRequired: { type: Boolean, required: true },
    calorieBurn: { type: Number, required: true },
    beginnerSets: { type: Number, required: true },
    beginnerReps: { type: Number, required: true },
    intermediateSets: { type: Number, required: true },
    intermediateReps: { type: Number, required: true },
    expertSets: { type: Number, required: true },
    expertReps: { type: Number, required: true },
    restTime: { type: Number, required: true },
    adviseWhenDoingExercise: { type: String, required: true, maxlength: 100 }, // Approx 10-15 words
});

const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);
export default Exercise;
