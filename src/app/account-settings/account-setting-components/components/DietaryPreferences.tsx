import React, { useState } from "react";
import { FaSave, FaEdit } from "react-icons/fa";

const macros = [
  "Balanced",
  "High Protein",
  "High Carb",
  "High Fat",
  "Low Carb",
  "Low Fat",
  "Low Sugar",
  "Vegan",
  "Vegetarian",
  "Gluten Free",
  "Dairy Free",
  "Low Sodium",
  "High Fiber",
  "Keto",
  "Paleo",
  "Intermittent Fasting",
];

const diets = [
  "Chicken",
  "Pork",
  "Lamb",
  "Fish",
  "Eggs",
  "Dairy",
  "Shellfish",
  "Tofu",
  "Nuts",
  "Seeds",
  "Gluten",
  "Soy",
  "Wheat",
  "Legumes",
  "Raw Food",
];

interface DietaryPreferencesProps {}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = () => {
  const defaultMacros = ["High Protein", "Balanced"]; // Default selected macros
  const defaultDiets = ["Vegetarian", "Vegan"]; // Default selected diets

  const [isEditing, setIsEditing] = useState(false); // Control editing mode
  const [selectedMacros, setSelectedMacros] = useState<string[]>(defaultMacros);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(defaultDiets);

  const handleMacroChange = (macro: string) => {
    setSelectedMacros((prev) =>
      prev.includes(macro)
        ? prev.filter((item) => item !== macro)
        : [...prev, macro]
    );
  };

  const handleDietChange = (diet: string) => {
    setSelectedDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((item) => item !== diet)
        : [...prev, diet]
    );
  };

  const handleSave = () => {
    setIsEditing(false); // Switch back to view mode
    // Optionally, you can save the changes to a database or backend here
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to editing mode
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[90vw]">
      <h3 className="text-2xl font-bold mb-4">Dietary Preferences</h3>
      <div className="space-y-6">
        {/* Macros */}
        <div>
          <h4 className="text-lg font-semibold">Macros</h4>
          {isEditing ? (
            <div className="space-x-2 space-y-2">
              {macros.map((macro) => (
                <button
                  key={macro}
                  onClick={() => handleMacroChange(macro)}
                  className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${selectedMacros.includes(macro) ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-300'}`}
                >
                  {macro}
                </button>
              ))}
            </div>
          ) : (
            <p>{selectedMacros.join(", ")}</p>
          )}
        </div>

        {/* Diet Types */}
        <div>
          <h4 className="text-lg font-semibold">Diet Types</h4>
          {isEditing ? (
            <div className="space-x-2 space-y-2">
              {diets.map((diet) => (
                <button
                  key={diet}
                  onClick={() => handleDietChange(diet)}
                  className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${selectedDiets.includes(diet) ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-300'}`}
                >
                  {diet}
                </button>
              ))}
            </div>
          ) : (
            <p>{selectedDiets.join(", ")}</p>
          )}
        </div>
      </div>

      {/* Edit/Save Buttons */}
      <div className="mt-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <FaSave className="inline-block mr-2" />
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaEdit className="inline-block mr-2" />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DietaryPreferences;
