import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IWeeklyExercise extends Document {
    userId: ObjectId;
    weekStart: Date;
    weekEnd: Date;
    dailyPlans: ObjectId[]; // References to DailyExercise
}

const WeeklyExerciseSchema = new Schema<IWeeklyExercise>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true },
    dailyPlans: [{ type: Schema.Types.ObjectId, ref: "DailyExercise", required: true }],
});

const WeeklyExercise = mongoose.model<IWeeklyExercise>("WeeklyExercise", WeeklyExerciseSchema);
export default WeeklyExercise;
