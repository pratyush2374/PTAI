import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

interface PersonalDetailsProps {
  onEditToggle: () => void; // Callback to toggle edit mode from the parent
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ onEditToggle }) => {
  const [isEditing, setIsEditing] = useState(false); // Internal state for edit mode
  const [details, setDetails] = useState({
    username: "johndoe123",
    email: "john.doe@example.com",
    password: "********",
    dob: "1990-01-01",
    height: "175 cm",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here (e.g., update server or local storage)
    setIsEditing(false); // Switch back to view mode
    onEditToggle(); // Notify parent to toggle overall edit mode if necessary
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[90vw]">
      <h2 className="text-2xl font-semibold text-center mb-6">Personal Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="font-medium">Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={details.username}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-3/4 text-sm"
            />
          ) : (
            <p className="text-gray-700">{details.username}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">Email:</label>
          <p className="text-gray-700">{details.email}</p>
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">Password:</label>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-3/4 text-sm"
            />
          ) : (
            <p className="text-gray-700">{details.password}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">Date of Birth:</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={details.dob}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-3/4 text-sm"
            />
          ) : (
            <p className="text-gray-700">{details.dob}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label className="font-medium">Height:</label>
          {isEditing ? (
            <input
              type="text"
              name="height"
              value={details.height}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-3/4 text-sm"
            />
          ) : (
            <p className="text-gray-700">{details.height}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <FaSave className="inline-block mr-2" /> Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaEdit className="inline-block mr-2" />Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
