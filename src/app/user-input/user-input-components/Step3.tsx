interface Step3Props {
  goal: string[];
  experience: string;
  pace: string;
  setGoal: React.Dispatch<React.SetStateAction<string[]>>;
  setExperience: React.Dispatch<React.SetStateAction<string>>;
  setPace: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

const Step3: React.FC<Step3Props> = ({
  goal,
  experience,
  pace,
  setGoal,
  setExperience,
  setPace,
  onNext,
}) => {
  const goals = [
    "Lose Weight",
    "Gain Weight",
    "Build Muscle",
    "Stay Fit",
    "Increase Stamina",
    "Improve Flexibility",
    "Boost Overall Strength",
    "Improve Mobility and Joint Health",
    "Increase Endurance",
    "Build Core Strength",
  ];

  const toggleGoal = (selectedGoal: string) => {
    setGoal((prev) =>
      prev.includes(selectedGoal)
        ? prev.filter((g) => g !== selectedGoal)
        : [...prev, selectedGoal]
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-black">Select Your Fitness Goals</h2>
      <div className="grid grid-cols-2 gap-4">
        {goals.map((option) => (
          <button
            key={option}
            onClick={() => toggleGoal(option)}
            className={`p-4 rounded-lg font-bold transition-all duration-200 ${
              goal.includes(option)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-black">Select Your Exercise Experience</h3>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:justify-start">
        {["Beginner", "Intermediate", "Advanced"].map((option) => (
          <button
            key={option}
            onClick={() => setExperience(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              experience === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-black">Select Your Pace</h3>
      <div className="flex gap-4">
        {["Slow", "Moderate", "Fast"].map((option) => (
          <button
            key={option}
            onClick={() => setPace(option)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              pace === option
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

export default Step3;
