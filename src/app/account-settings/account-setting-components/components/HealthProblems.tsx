import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa"; // Import FaEdit and FaSave from react-icons

const healthProblems = [
  "None",
  "Diabetes",
  "Hypertension",
  "High Cholesterol",
  "Heart Disease",
  "Obesity",
  "Asthma",
  "Arthritis",
  "Lactose Intolerance",
  "Gluten Intolerance",
  "Acid Reflux",
  "Irritable Bowel Syndrome (IBS)",
  "Insomnia",
  "Thyroid Disorders",
  "PCOS",
];

const allergies = [
  "None",
  "Peanuts",
  "Tree Nuts",
  "Shellfish",
  "Fish",
  "Eggs",
  "Milk",
  "Soy",
  "Wheat",
  "Seeds",
  "Mustard",
  "Legumes",
  "Gluten",
  "Pollen",
  "Dust Mites",
  "Mold",
];

interface HealthProblemsProps {}

const HealthProblems: React.FC<HealthProblemsProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHealthIssues, setSelectedHealthIssues] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const handleSelectionChange = (value: string, setter: React.Dispatch<React.SetStateAction<any>>, selectedArray: string[]) => {
    setter(selectedArray.includes(value) ? selectedArray.filter((item) => item !== value) : [...selectedArray, value]);
  };

  const handleSave = () => {
    setIsEditing(false); // Switch to view mode after saving
    // Optionally, you can save data to a backend here
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to editing mode
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[90vw]">
      <h3 className="text-2xl font-bold mb-4">Health Problems</h3>
      <div className="flex gap-4 flex-wrap">
        {isEditing ? (
          healthProblems.map((issue) => (
            <button
              key={issue}
              onClick={() => handleSelectionChange(issue, setSelectedHealthIssues, selectedHealthIssues)}
              className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${selectedHealthIssues.includes(issue) ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              {issue}
            </button>
          ))
        ) : (
          <p>{selectedHealthIssues.join(", ") || "No Health Problems Selected"}</p>
        )}
      </div>

      <h3 className="text-2xl font-bold mt-6 mb-4">Allergies</h3>
      <div className="flex gap-4 flex-wrap">
        {isEditing ? (
          allergies.map((allergy) => (
            <button
              key={allergy}
              onClick={() => handleSelectionChange(allergy, setSelectedAllergies, selectedAllergies)}
              className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${selectedAllergies.includes(allergy) ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-300'}`}
            >
              {allergy}
            </button>
          ))
        ) : (
          <p>{selectedAllergies.join(", ") || "No Allergies Selected"}</p>
        )}
      </div>

      {/* Edit/Save Button with React Icons */}
      <div className="mt-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <FaSave className="inline-block mr-2" /> Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaEdit className="inline-block mr-2" /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default HealthProblems;
