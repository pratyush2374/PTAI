import mongoose, { Document, Schema } from "mongoose";

interface IMonthlyStats extends Document {
    userId: mongoose.Types.ObjectId;
    monthlyData: Array<{
        weeklyData: mongoose.Types.ObjectId;
    }>;
}

const monthlyStatsSchema = new Schema<IMonthlyStats>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    monthlyData: [
        {
            weeklyData: {
                type: Schema.Types.ObjectId,
                ref: "WeeklyStats",
                required: true,
            },
        },
    ],
});

const MonthlyStats = mongoose.model<IMonthlyStats>(
    "MonthlyStats",
    monthlyStatsSchema
);
export default MonthlyStats;
