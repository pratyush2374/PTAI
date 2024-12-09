import mongoose, { Document, Schema } from "mongoose";

// Mongoose enum for months
const MonthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

interface IYearlyStats extends Document {
    userId: mongoose.Types.ObjectId;
    yearlyData: Array<{
        month: (typeof MonthsOfYear)[number];
        monthlyStats: mongoose.Types.ObjectId;
    }>;
}

const yearlyStatsSchema = new Schema<IYearlyStats>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    yearlyData: [
        {
            month: { type: String, enum: MonthsOfYear, required: true },
            monthlyStats: {
                type: Schema.Types.ObjectId,
                ref: "MonthlyStats",
                required: true,
            },
        },
    ],
});

const YearlyStats = mongoose.model<IYearlyStats>(
    "YearlyStats",
    yearlyStatsSchema
);
export default YearlyStats;
