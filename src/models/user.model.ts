import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface IWeight extends Document {
    date: string;
    weight: number;
}

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
    preferences: ObjectId;
    healthAndDietary: ObjectId;
    dietId: ObjectId;
    exerciseId: ObjectId;
    userStats: ObjectId;
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
        weight: {
            type: [
                new Schema<IWeight>(
                    {
                        date: { type: String, required: true },
                        weight: { type: Number, required: true },
                    },
                    { _id: false, strict: true } 
                ),
            ],
            default: [],
        },
        preferences: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserPreferences",
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
        userStats: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DailyStats",
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

