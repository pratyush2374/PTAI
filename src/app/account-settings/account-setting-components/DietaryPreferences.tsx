import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import axios from "axios";

interface DietaryPreferencesProps {
  preferences: string[];
  macroPreferences: string[];
}

const DIETARY_PREFERENCES = [
  "Chicken", "Lamb", "Fish", "Eggs", "Dairy", "Shellfish", "Tofu",
  "Nuts", "Seeds", "Gluten", "Soy", "Wheat", "Legumes", "Raw Food"
];

const MACRO_PREFERENCES = [
  "Balanced", "High Protein", "High Carb", "High Fat", "Low Carb",
  "Low Fat", "Low Sugar", "Vegan", "Strict Vegetarian", "Gluten Free",
  "Dairy Free", "Low Sodium", "High Fiber", "Keto", "Paleo",
  "Intermittent Fasting"
];

const DietaryPreferences = ({ preferences, macroPreferences }: DietaryPreferencesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    preferences,
    macroPreferences
  });
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await axios.post("/api/edit-dietary-preferences", formData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Dietary preferences updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive"
      });
    }
  };

  const togglePreference = (array: keyof typeof formData, item: string) => {
    setFormData(prev => ({
      ...prev,
      [array]: prev[array].includes(item) 
        ? prev[array].filter(i => i !== item)
        : [...prev[array], item]
    }));
  };

  return (
    <Card className="md:p-6 mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold">Dietary Preferences</h3>
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
              <h4 className="font-medium">Food Preferences</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {DIETARY_PREFERENCES.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={formData.preferences.includes(item)}
                      onCheckedChange={() => togglePreference('preferences', item)}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Macro & Diet Type Preferences</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {MACRO_PREFERENCES.map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={formData.macroPreferences.includes(item)}
                      onCheckedChange={() => togglePreference('macroPreferences', item)}
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
              <h4 className="font-medium mb-2">Food Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {formData.preferences.map(pref => (
                  <span key={pref} className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Macro & Diet Type Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {formData.macroPreferences.map(pref => (
                  <span key={pref} className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                    {pref}
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

export default DietaryPreferences;