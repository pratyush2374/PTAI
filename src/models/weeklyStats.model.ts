import mongoose, { Document, Schema } from "mongoose";

const DaysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

interface IWeeklyStats extends Document {
    userId: mongoose.Types.ObjectId;
    weeklyData: Array<{
        day: (typeof DaysOfWeek)[number];
        dailyStats: mongoose.Types.ObjectId;
    }>;
}

const weeklyStatsSchema = new Schema<IWeeklyStats>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weeklyData: [
        {
            day: { type: String, enum: DaysOfWeek, required: true },
            dailyStats: {
                type: Schema.Types.ObjectId,
                ref: "DailyStats",
                required: true,
            },
        },
    ],
});

const WeeklyStats = mongoose.model<IWeeklyStats>(
    "WeeklyStats",
    weeklyStatsSchema
);
export default WeeklyStats;
