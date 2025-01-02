import React, { useState } from "react";
import { FaSave, FaEdit } from "react-icons/fa"; // Import icons

const activityLevels = [
  "Sedentary", "Light", "Moderate", "Active", "Very Active"
];

const exerciseTypes = [
  "Cardio", "Strength", "Weightlifting", "HIIT", "Pilates", "Aerobics", "Yoga", "Running", "Cycling", "Swimming"
];

const workoutDurations = [
  "15-30", "30-45", "45-60", "60+"
];

const exerciseFrequencies = [
  "1-2", "3-4", "5-6", "Daily"
];

const fitnessGoals = [
  "Lose Weight", "Gain Weight", "Build Muscle", "Stay Fit", "Increase Stamina", 
  "Improve Flexibility", "Boost Overall Strength", "Improve Mobility and Joint Health", 
  "Increase Endurance", "Build Core Strength"
];

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
const paceLevels = ["Slow", "Moderate", "Fast"];

const equipmentOptions = [
  "No Equipment", "Dumbbell", "Treadmill", "Elliptical Machine", "Rowing Machine", "Leg Press Machine", 
  "Barbell", "Resistance Bands", "Kettlebell", "Exercise Ball", "Medicine Ball", "Pull-Up Bar", 
  "Jump Rope", "Stationary Bike", "Squat Rack", "Flat Bench", "Cable Machine"
];

interface ExerciseDetailsProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ isEditing, setIsEditing }) => {
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('Moderate');
  const [selectedExerciseType, setSelectedExerciseType] = useState('Cardio');
  const [selectedDuration, setSelectedDuration] = useState('30-45');
  const [selectedFrequency, setSelectedFrequency] = useState('3-4');
  const [selectedFitnessGoals, setSelectedFitnessGoals] = useState('Lose Weight');
  const [selectedExperience, setSelectedExperience] = useState('Beginner');
  const [selectedPace, setSelectedPace] = useState('Moderate');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  const handleSelectionChange = (value: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    setter(value);
  };

  const handleMultiSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedEquipments((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const renderSelectionButtons = (items: string[], selectedValue: string, setter: React.Dispatch<React.SetStateAction<any>>) => (
    <div className="space-x-2 space-y-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleSelectionChange(item, setter)}
          className={`p-2 px-4 rounded-lg font-bold transition-all duration-200 ${selectedValue === item ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-300'}`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  const renderMultiSelectionCheckboxes = (items: string[]) => (
    <div className="space-y-2">
      {items.map((item) => (
        <label key={item} className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            value={item}
            onChange={handleMultiSelectionChange}
            className="h-4 w-4 border-gray-300 rounded"
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[90vw]">
      <h3 className="text-2xl font-bold mb-4">Exercise Details</h3>
      <div className="space-y-6">
        {/* Activity Level */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Activity Level</label>
          {isEditing ? renderSelectionButtons(activityLevels, selectedActivityLevel, setSelectedActivityLevel) : <span className="text-gray-600">{selectedActivityLevel}</span>}
        </div>

        {/* Preferred Exercise Type */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Preferred Exercise Type</label>
          {isEditing ? renderSelectionButtons(exerciseTypes, selectedExerciseType, setSelectedExerciseType) : <span className="text-gray-600">{selectedExerciseType}</span>}
        </div>

        {/* Workout Duration */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Workout Duration (Minutes)</label>
          {isEditing ? renderSelectionButtons(workoutDurations, selectedDuration, setSelectedDuration) : <span className="text-gray-600">{selectedDuration}</span>}
        </div>

        {/* Exercise Frequency */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Exercise Frequency</label>
          {isEditing ? renderSelectionButtons(exerciseFrequencies, selectedFrequency, setSelectedFrequency) : <span className="text-gray-600">{selectedFrequency}</span>}
        </div>

        {/* Fitness Goals */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Fitness Goals</label>
          {isEditing ? renderSelectionButtons(fitnessGoals, selectedFitnessGoals, setSelectedFitnessGoals) : <span className="text-gray-600">{selectedFitnessGoals}</span>}
        </div>

        {/* Experience Level */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Experience Level</label>
          {isEditing ? renderSelectionButtons(experienceLevels, selectedExperience, setSelectedExperience) : <span className="text-gray-600">{selectedExperience}</span>}
        </div>

        {/* Pace */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Pace</label>
          {isEditing ? renderSelectionButtons(paceLevels, selectedPace, setSelectedPace) : <span className="text-gray-600">{selectedPace}</span>}
        </div>

        {/* Available Equipment */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Available Equipment</label>
          {isEditing ? renderMultiSelectionCheckboxes(equipmentOptions) : <span className="text-gray-600">{selectedEquipments.length > 0 ? selectedEquipments.join(", ") : "None selected"}</span>}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {isEditing ? (
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            <FaSave className="inline-block mr-2" />
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <FaEdit className="inline-block mr-2" />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetails;
