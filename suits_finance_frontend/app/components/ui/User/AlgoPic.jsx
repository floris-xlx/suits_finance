import React from 'react';

const AlgoPic = ({ profilePicture }) => {
  return (
    <>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Profile picture"
          className="w-16 h-16 rounded-md"
        />
      ) : (
        <div className="w-16 h-16 rounded-md bg-brand-disabled"></div>
      )}
    </>
  );
};

export default AlgoPic;
