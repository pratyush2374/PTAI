import mongoose, { Schema, Document } from "mongoose";

interface IDailyExercise extends Document {
    userId: Schema.Types.ObjectId;
    date: Date;
    exercises: {
        exercise: Schema.Types.ObjectId;
        repetitions: number;
        sets: number;
        duration?: number;
    }[];
}

const DailyExerciseSchema = new Schema<IDailyExercise>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    exercises: [
        {
            exercise: {
                type: Schema.Types.ObjectId,
                ref: "Exercise",
                required: true,
            },
            repetitions: { type: Number, required: true },
            sets: { type: Number, required: true },
            duration: { type: Number, default: 0 },
        },
    ],
});

const DailyExercise = mongoose.model<IDailyExercise>(
    "DailyExercise",
    DailyExerciseSchema
);
export default DailyExercise;
