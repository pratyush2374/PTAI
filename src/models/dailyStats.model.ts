import mongoose, { Document, Schema } from "mongoose";

interface IDailyStats extends Document {
    userId: mongoose.Types.ObjectId;
    stepCount?: number;
    caloriesBurnt?: number;
    caloriesGained?: number;
    exerciseCompleted?: number;
    waterIntake?: number;
    currentWeight?: number;
    distanceWalked?: number;
    distanceRunned?: number;
    totalHoursSlept?: number;
    averageHeartRate?: number;
    goalAchievement?: number;
    totalMealsLogged?: number;
    minutesWorkedOut?: number;
}

const dailyStatsSchema = new Schema<IDailyStats>({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    stepCount: { type: Number },
    caloriesBurnt: { type: Number },
    caloriesGained: { type: Number },
    exerciseCompleted: { type: Number },
    waterIntake: { type: Number },
    currentWeight: { type: Number },
    distanceWalked: { type: Number, default: 0 },
    distanceRunned: { type: Number, default: 0 },
    totalHoursSlept: { type: Number },
    averageHeartRate: { type: Number },
    goalAchievement: { type: Number },
    totalMealsLogged: { type: Number },
    minutesWorkedOut: { type: Number },
});

const DailyStats = mongoose.model<IDailyStats>("DailyStats", dailyStatsSchema);
export default DailyStats;
