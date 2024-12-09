import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IDailyExercise extends Document {
    userId: ObjectId;
    date: Date;
    exercises: ObjectId[];
}

const DailyExerciseSchema = new Schema<IDailyExercise>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    exercises: [
        { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    ],
});

const DailyExercise = mongoose.model<IDailyExercise>(
    "DailyExercise",
    DailyExerciseSchema
);
export default DailyExercise;
