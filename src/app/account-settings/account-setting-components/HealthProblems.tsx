import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import axios from "axios";

interface HealthProblemsProps {
  problems: string[];
  allergies: string[];
}

const HEALTH_PROBLEMS = [
  "None", "Diabetes", "Hypertension", "High Cholesterol", "Heart Disease",
  "Obesity", "Asthma", "Arthritis", "Lactose Intolerance", "Gluten Intolerance",
  "Acid Reflux", "Irritable Bowel Syndrome (IBS)", "Insomnia", 
  "Thyroid Disorders", "PCOS"
];

const ALLERGIES = [
  "None", "Peanuts", "Tree Nuts", "Shellfish", "Fish", "Eggs", "Milk",
  "Soy", "Wheat", "Seeds", "Mustard", "Legumes", "Gluten", "Pollen",
  "Dust Mites", "Mold"
];

const HealthProblems = ({ problems, allergies }: HealthProblemsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    problems,
    allergies
  });
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await axios.post("/api/edit-health-problems", formData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Health information updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update health information",
        variant: "destructive"
      });
    }
  };

  const toggleItem = (array: keyof typeof formData, item: string) => {
    if (item === "None") {
      setFormData(prev => ({
        ...prev,
        [array]: ["None"]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [array]: prev[array].includes("None") 
          ? [item]
          : prev[array].includes(item)
            ? prev[array].filter(i => i !== item)
            : [...prev[array], item]
      }));
    }
  };

  return (
    <Card className="md:p-6 mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">Health Information</h3>
        <Button 
          variant="ghost" 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? <FaSave className="h-4 w-4" /> : <FaEdit className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium">Health Problems</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {HEALTH_PROBLEMS.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={formData.problems.includes(item)}
                      onCheckedChange={() => toggleItem('problems', item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Allergies</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ALLERGIES.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={formData.allergies.includes(item)}
                      onCheckedChange={() => toggleItem('allergies', item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Health Problems</h4>
              <div className="flex flex-wrap gap-2">
                {formData.problems.map(problem => (
                  <span key={problem} className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                    {problem}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Allergies</h4>
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map(allergy => (
                  <span key={allergy} className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthProblems;