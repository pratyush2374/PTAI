import React from "react";
import styles from "src/app/account-settings/account-settings.module.css";

interface ProfileCardProps {
  name: string;
  email: string;
  image: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, image }) => {
  return (
    <div className="profile-card p-6 bg-white shadow-lg rounded-lg w-[90vw] flex items-center">
      {/* Profile Image */}
      <img
        src={image}
        alt="User"
        className="profile-image rounded-full w-16 h-16 mr-4" // Set image size and rounded corners
      />
      
      {/* Profile Info */}
      <div className="profile-info">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
