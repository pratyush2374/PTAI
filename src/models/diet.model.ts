import mongoose, { Document, Schema } from "mongoose";

interface IMeal {
    name: string;
    ingredients: string[];
    calories: number;
    time: string;
    protein: string;
    carbs: string;
    fats: string;
}

export interface IDietAssignment extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    date: Date;
    meals: {
        breakfast: IMeal;
        lunch: IMeal;
        snacks: IMeal;
        dinner: IMeal;
    };
    total: {
        totalCalories: number;
        protein: string;
        carbs: string;
        fats: string;
    };
}

const MealSchema: Schema<IMeal> = new Schema(
    {
        name: { type: String, required: true },
        ingredients: { type: [String], required: true },
        calories: { type: Number, required: true },
        time: { type: String, required: true },
        protein: { type: String, required: true },
        carbs: { type: String, required: true },
        fats: { type: String, required: true },
    },
    { _id: false }
);

const DietAssignmentSchema: Schema<IDietAssignment> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: { type: Date, required: true },
        meals: {
            breakfast: { type: MealSchema, required: true },
            lunch: { type: MealSchema, required: true },
            snacks: { type: MealSchema, required: true },
            dinner: { type: MealSchema, required: true },
        },
        total: {
            totalCalories: { type: Number, required: true },
            protein: { type: String, required: true },
            carbs: { type: String, required: true },
            fats: { type: String, required: true },
        },
    },
    {
        timestamps: true,
    }
);

const DietAssignment = mongoose.model<IDietAssignment>(
    "DietAssignment",
    DietAssignmentSchema
);
export default DietAssignment;
