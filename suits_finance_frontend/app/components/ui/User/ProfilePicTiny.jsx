import React from 'react';

const ProfilePicTiny = ({ profilePicture }) => {
  return (
    <>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Profile picture"
          className="w-8 h-8 rounded-md"
        />
      ) : (
        <div className="w-8 h-8 rounded-md bg-brand-disabled"></div>
      )}
    </>
  );
};

export default ProfilePicTiny;
