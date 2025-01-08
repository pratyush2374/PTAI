// Step5.tsx

interface Step5Props {
  macroNutrientPreferences: string[];
  dietaryPreferences: string[];
  setMacroNutrientPreferences: React.Dispatch<React.SetStateAction<string[]>>;
  setDietaryPreferences: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
}

const Step5: React.FC<Step5Props> = ({
  macroNutrientPreferences,
  dietaryPreferences,
  setMacroNutrientPreferences,
  setDietaryPreferences,
  onNext
}) => {
  
  const handleMultiSelectMacroNutrient = (value: string) => {
    setMacroNutrientPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleMultiSelectDietary = (value: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="space-y-4">
      {/* Macro Nutrient Preferences */}
      <h3 className="text-lg font-semibold text-black">
        Macro Nutrient Preferences
      </h3>
      <div className="flex flex-wrap gap-4">
        {[
          "Balanced",
          "High Protein",
          "High Carb",
          "High Fat",
          "Low Carb",
          "Low Fat",
          "Low Sugar",
          "Vegan",
          "Strict Vegetarian",
          "Gluten Free",
          "Dairy Free",
          "Low Sodium",
          "High Fiber",
          "Keto",
          "Paleo",
          "Intermittent Fasting",
        ].map((option) => (
          <button
            key={option}
            onClick={() => handleMultiSelectMacroNutrient(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              macroNutrientPreferences.includes(option)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Dietary Preferences */}
      <h3 className="text-lg font-semibold text-black">
        Dietary Preferences
      </h3>
      <div className="flex flex-wrap gap-4">
        {[
          "Chicken",
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
        ].map((option) => (
          <button
            key={option}
            onClick={() => handleMultiSelectDietary(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              dietaryPreferences.includes(option)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Step5;
