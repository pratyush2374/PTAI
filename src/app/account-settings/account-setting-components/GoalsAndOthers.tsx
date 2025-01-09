import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface GoalsAndOthersProps {
  stats: {
    currentStreak: number;
    highestStreak: number;
    stepsGoal: number | null;
    sleepGoal: number | null;
    achievements: string[];
    totalWeightChange: number;
    averageWeight: number;
  };
  fitnessGoals: string[];
}

const AVAILABLE_GOALS = [
  "Lose Weight", "Gain Weight", "Build Muscle", "Stay Fit",
  "Increase Stamina", "Improve Flexibility", "Boost Overall Strength",
  "Improve Mobility and Joint Health", "Increase Endurance", "Build Core Strength",
];

const GoalsAndOthers = ({ stats, fitnessGoals }: GoalsAndOthersProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState(fitnessGoals);
  const [stepsGoal, setStepsGoal] = useState(stats.stepsGoal || 10000);
  const [sleepGoal, setSleepGoal] = useState(stats.sleepGoal || 8);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await axios.post("/api/edit-goals", {
        fitnessGoals: selectedGoals,
        stepsGoal,
        sleepGoal
      });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Goals updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update goals",
        variant: "destructive"
      });
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <Card className="md:p-6 mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">Goals & Statistics</h3>
        <Button 
          variant="ghost" 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? <FaSave className="h-4 w-4" /> : <FaEdit className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-lg font-medium mb-4">Daily Goals</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Steps Goal</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={stepsGoal}
                  onChange={(e) => setStepsGoal(parseInt(e.target.value))}
                  min={1000}
                  max={50000}
                />
              ) : (
                <p className="text-gray-700">{stepsGoal.toLocaleString()} steps</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Sleep Goal</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={sleepGoal}
                  onChange={(e) => setSleepGoal(parseInt(e.target.value))}
                  min={4}
                  max={12}
                />
              ) : (
                <p className="text-gray-700">{sleepGoal} hours</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-4">Fitness Goals</h4>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AVAILABLE_GOALS.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedGoals.includes(goal)}
                    onCheckedChange={() => toggleGoal(goal)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedGoals.map((goal) => (
                <span key={goal} className="px-3 py-1 rounded-full bg-primary/10 text-sm">
                  {goal}
                </span>
              ))}
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default GoalsAndOthers;