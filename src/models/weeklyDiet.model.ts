import mongoose, { Document, Schema } from "mongoose";
import { IDietAssignment } from "./diet.model"; 

interface IWeeklyDietPlan extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    weekStartDate: Date;
    weeklyMeals: IDietAssignment[];
}

const WeeklyDietPlanSchema: Schema<IWeeklyDietPlan> = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weekStartDate: { type: Date, required: true },
    weeklyMeals: { type: [Schema.Types.ObjectId], ref: "DietAssignment", required: true },
}, { timestamps: true });

const WeeklyDietPlan = mongoose.model<IWeeklyDietPlan>("WeeklyDietPlan", WeeklyDietPlanSchema);
export default WeeklyDietPlan;
