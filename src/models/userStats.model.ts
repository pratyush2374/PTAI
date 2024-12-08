import mongoose, { Schema, Document } from "mongoose";

export interface IUserStats extends Document {
    totalMealsLogged: number;
    totalWorkouts: number;
    totalCaloriesBurnt: number;
    totalMinutesWorkedOut: number;
    currentStreak: number;
    highestStreak: number;
    averageCaloriesBurnt: number;
    goalAchievement: number;
    mealsLogged: number;
    totalWaterIntake: number;
    totalHoursSlept: number;
}

const UserStatsSchema: Schema<IUserStats> = new Schema(
    {
        totalMealsLogged: { type: Number, default: 0 },
        totalWorkouts: { type: Number, default: 0 },
        totalCaloriesBurnt: { type: Number, default: 0 },
        totalMinutesWorkedOut: { type: Number, default: 0 },
        currentStreak: { type: Number, default: 0 },
        highestStreak: { type: Number, default: 0 },
        averageCaloriesBurnt: { type: Number, default: 0 },
        goalAchievement: { type: Number, default: 0 },
        mealsLogged: { type: Number, default: 0 },
        totalWaterIntake: { type: Number, default: 0 },
        totalHoursSlept: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const UserStats = mongoose.model<IUserStats>("UserStats", UserStatsSchema);
export default UserStats;
