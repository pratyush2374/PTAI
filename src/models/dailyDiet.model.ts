import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IDailyDiet extends Document {
    userId: ObjectId;
    date: Date;
    meals: {
        breakfast: ObjectId[]; 
        lunch: ObjectId[];     
        snacks: ObjectId[];    
        dinner: ObjectId[];    
    };
}

const DailyDietSchema = new Schema<IDailyDiet>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    meals: {
        breakfast: [{ type: Schema.Types.ObjectId, ref: "Diet", required: true }],
        lunch: [{ type: Schema.Types.ObjectId, ref: "Diet", required: true }],
        snacks: [{ type: Schema.Types.ObjectId, ref: "Diet", required: true }],
        dinner: [{ type: Schema.Types.ObjectId, ref: "Diet", required: true }],
    },
});

const DailyDiet = mongoose.model<IDailyDiet>("DailyDiet", DailyDietSchema);
export default DailyDiet;
