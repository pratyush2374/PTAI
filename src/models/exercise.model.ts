import mongoose, { Schema, Document } from "mongoose";

interface IExercise extends Document {
    name: string;
    type: string;
    duration: number;
    repetitions: number;
    sets: number;
}

const ExerciseSchema = new Schema<IExercise>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 0 },
    repetitions: { type: Number, default: 0 },
    sets: { type: Number, default: 0 },
});

const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);
export default Exercise;
