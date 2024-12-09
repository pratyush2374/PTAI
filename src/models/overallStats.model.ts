import mongoose, { Document, Schema } from 'mongoose';

interface IOverallStats extends Document {
  currentStreak: number;
  highestStreak: number;
  achievements: string[];
  totalWeightLossOrGained: number;
  averageWeight: number;
}

const overallStatsSchema = new Schema<IOverallStats>({
  currentStreak: { type: Number, required: true },
  highestStreak: { type: Number, required: true },
  achievements: { type: [String], required: true },
  totalWeightLossOrGained: { type: Number, required: true },
  averageWeight: { type: Number, required: true },
});

const OverallStats = mongoose.model<IOverallStats>('OverallStats', overallStatsSchema);
export default OverallStats;
