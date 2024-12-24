interface Step4Props {
  availableEquipments: string[];
  setAvailableEquipments: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
}

const Step4: React.FC<Step4Props> = ({ availableEquipments, setAvailableEquipments, onNext }) => {
  const equipmentOptions = [
    "No Equipment",
    "Dumbbell",
    "Treadmills",
    "Ellipticals",
    "Rowing Machines",
    "Stair Climbers",
    "Weight Plates",
    "Leg Press Machine",
    "Chest Press Machine",
    "Lat Pulldown Machine",
    "Seated Row Machine",
    "Adjustable Bench",
    "Flat Bench",
    "Squat Rack",
    "Barbell",
    "Resistance Bands",
    "Kettlebell",
    "Exercise Ball",
    "Medicine Ball",
    "Pull-Up Bar",
    "Jump Rope",
    "Treadmill",
    "Stationary Bike",
    "Rowing Machine",
    "Elliptical Machine",
    "Bench",
    "Yoga Mat",
    "Battle Ropes",
    "Smith Machine",
    "Cable Machine",
  ];

  const toggleEquipment = (equipment: string) => {
    setAvailableEquipments((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        : [...prev, equipment]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-black">Select Available Equipment</h3>
      <div className="grid grid-cols-2 gap-4">
        {equipmentOptions.map((equipment) => (
          <button
            key={equipment}
            onClick={() => toggleEquipment(equipment)}
            className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              availableEquipments.includes(equipment)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {equipment}
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

export default Step4;
