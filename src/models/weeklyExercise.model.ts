import mongoose, { Schema, Document } from "mongoose";

interface IWeeklyExercise extends Document {
    userId: Schema.Types.ObjectId;
    weekStartDate: Date;
    exercises: {
        day: string;
        dailyExercises: Schema.Types.ObjectId[];
    }[];
}

const WeeklyExerciseSchema = new Schema<IWeeklyExercise>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weekStartDate: { type: Date, required: true },
    exercises: [
        {
            day: {
                type: String,
                enum: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                required: true,
            },
            dailyExercises: [
                { type: Schema.Types.ObjectId, ref: "DailyExercise" },
            ],
        },
    ],
});

const WeeklyExercise = mongoose.model<IWeeklyExercise>(
    "WeeklyExercise",
    WeeklyExerciseSchema
);
export default WeeklyExercise;
