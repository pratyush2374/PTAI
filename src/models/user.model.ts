import mongoose, { Document, Schema } from "mongoose";
import { IWeight, WeightSchema } from "./weight.model";

//Just in case if error happens
import { IUserPreferences } from "./userPreferences.model";
import { IUserStats } from "./userStats.model";
import { IHealthAndDietary } from "./healthAndDietary.model";

export interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    googleId?: string;
    profilePic?: string;
    age: number;
    gender: string;
    height: number;
    weight: IWeight[];
    preferences: mongoose.Schema.Types.ObjectId;
    stats: mongoose.Schema.Types.ObjectId;
    healthAndDietary: mongoose.Schema.Types.ObjectId;
    dietId: mongoose.Schema.Types.ObjectId;
    exerciseId: mongoose.Schema.Types.ObjectId;
    userStatsId: mongoose.Schema.Types.ObjectId;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        fullName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        googleId: { type: String, unique: true, sparse: true },
        profilePic: { type: String },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        height: { type: Number, required: true },
        weight: { type: [WeightSchema], default: [] },
        preferences: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserPreferences",
        },
        stats: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserStats",
        },
        healthAndDietary: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HealthAndDietary",
        },
        dietId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DietAssignment",
        },
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExerciseAssignment",
        },
        userStatsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserStats",
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
