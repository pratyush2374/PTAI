import React from "react";

interface Step2Props {
  activityLevel: string;
  preferredExerciseType: string[];
  workoutDuration: string;
  exerciseFrequency: string;
  setActivityLevel: React.Dispatch<React.SetStateAction<string>>;
  setPreferredExerciseType: React.Dispatch<React.SetStateAction<string[]>>;
  setWorkoutDuration: React.Dispatch<React.SetStateAction<string>>;
  setExerciseFrequency: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({
  activityLevel,
  preferredExerciseType,
  workoutDuration,
  exerciseFrequency,
  setActivityLevel,
  setPreferredExerciseType,
  setWorkoutDuration,
  setExerciseFrequency,
  onNext,
}) => {
  const handleMultiSelect = (option: string) => {
    if (preferredExerciseType.includes(option)) {
      setPreferredExerciseType(
        preferredExerciseType.filter((type) => type !== option)
      );
    } else {
      setPreferredExerciseType([...preferredExerciseType, option]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-black">Fitness Preferences</h2>

      <h3 className="text-lg font-semibold text-black">Activity Level</h3>
      <div className="flex flex-wrap gap-4">
        {["Sedentary", "Light", "Moderate", "Active", "Very active"].map(
          (option) => (
            <button
              key={option}
              onClick={() => setActivityLevel(option)}
              className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                activityLevel === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          )
        )}
      </div>

      <h3 className="text-lg font-semibold text-black">
        Preferred Exercise Type
      </h3>
      <div className="flex gap-4 flex-wrap">
        {[
          "Cardio",
          "Strength",
          "Weightlifting",
          "HIIT",
          "Pilates",
          "Aerobics",
          "Yoga",
          "Running",
          "Cycling",
          "Swimming",
        ].map((option) => (
          <button
            key={option}
            onClick={() => handleMultiSelect(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              preferredExerciseType.includes(option)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-black">
        Workout Duration (Minutes)
      </h3>
      <div className="flex gap-4">
        {["15-30", "30-45", "45-60", "60+"].map((option) => (
          <button
            key={option}
            onClick={() => setWorkoutDuration(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 text-sm md:text-base ${
              workoutDuration === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-black">Exercise Frequency</h3>
      <div className="flex gap-4">
        {["1-2", "3-4", "5-6", "Daily"].map((option) => (
          <button
            key={option}
            onClick={() => setExerciseFrequency(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              exerciseFrequency === option
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

export default Step2;
