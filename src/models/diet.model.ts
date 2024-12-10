import mongoose, { Schema, Document } from "mongoose";

export interface IDiet extends Document {
    name: string;
    category: string[];
    weight: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fibre: number;
    otherMacroNutrients: string;
    keyIngredients: string[];
    commonAllergens?: string;
    cookingTime: number;
    recipe: string;
}

const DietSchema = new Schema<IDiet>({
    name: { type: String, required: true },
    category: { type: [String], required: true },
    weight: { type: Number, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    fibre: { type: Number, required: true },
    otherMacroNutrients: { type: String, required: true },
    keyIngredients: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: "At least one ingredient must be specified.",
        },
    },
    commonAllergens: { type: String },
    cookingTime: { type: Number, required: true },
    recipe: { type: String, required: true, maxlength: 100 },
});

const Diet = mongoose.model<IDiet>("Diet", DietSchema);
export default Diet;
