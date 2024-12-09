import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IWeeklyDiet extends Document {
    userId: ObjectId;
    weekStart: Date;
    weekEnd: Date;
    dailyPlans: ObjectId[]; // References to DailyDiet
}

const WeeklyDietSchema = new Schema<IWeeklyDiet>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true },
    dailyPlans: [{ type: Schema.Types.ObjectId, ref: "DailyDiet", required: true }], // List of DailyDiet plans
});

const WeeklyDiet = mongoose.model<IWeeklyDiet>("WeeklyDiet", WeeklyDietSchema);
export default WeeklyDiet;
