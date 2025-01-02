"use client";
import React, { useState } from "react";
import ProfileCard from "./account-setting-components/components/ProfileCard";
import PersonalDetails from "./account-setting-components/components/PersonalDetails";
import ExerciseDetails from "./account-setting-components/components/ExerciseDetails";
import DietaryPreferences from "./account-setting-components/components/DietaryPreferences";
import HealthProblems from "./account-setting-components/components/HealthProblems";
// import "./account-settings.modules.css";

const App: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); // Toggle editing state
  };

  return (
    <div className=" w-[90vw] mx-auto">
      <ProfileCard
        name="John Doe"
        email="john.doe@example.com"
        image="https://www.w3schools.com/w3images/avatar2.png"
      />

      <div className="details-section mt-6 jutify-center">
        <PersonalDetails onEditToggle={handleEditToggle} />
        <ExerciseDetails isEditing={isEditing} setIsEditing={setIsEditing} />
        <DietaryPreferences />
        <HealthProblems />
      </div>
    </div>
  );
};

export default App;
