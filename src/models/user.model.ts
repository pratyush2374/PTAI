import mongoose, { Document, Schema } from "mongoose";

interface IWeight {
    date: string;
    weight: number;
}

interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    googleId?: string;
    profilePic?: string;
    dob: Date;
    age: number;
    height: number;
    weight: IWeight[];
    fitnessGoal: string;
    pace: string;
    activityLevel: string;
    availableEquipments: string[];
    dietId: mongoose.Schema.Types.ObjectId;
    exerciseId: mongoose.Schema.Types.ObjectId;
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

const WeightSchema: Schema<IWeight> = new Schema(
    {
        date: { type: String, required: true },
        weight: { type: Number, required: true },
    },
    { _id: false }
);

const UserSchema: Schema<IUser> = new Schema(
    {
        fullName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verifyCode: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        googleId: { type: String, unique: true, sparse: true },
        profilePic: { type: String },
        dob: { type: Date, required: true },
        age: { type: Number, required: true },
        height: { type: Number, required: true },
        weight: { type: [WeightSchema], default: [] },
        fitnessGoal: { type: String, required: true },
        pace: { type: String, required: true },
        activityLevel: { type: String, required: true },
        availableEquipments: { type: [String], default: [] },
        dietId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DietAssignment",
        },
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExerciseAssignment",
        },
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
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
