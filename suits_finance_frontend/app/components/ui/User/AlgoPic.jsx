import React from 'react';
import Image from 'next/image';

const AlgoPic = ({ profilePicture }) => {
  return (
    <>
      {profilePicture ? (
        <Image
          src={profilePicture}
          alt="Profile picture"
          width={64}
          height={64}
          className="w-16 h-16 rounded-md"
        />
      ) : (
        <div className="w-16 h-16 rounded-md bg-brand-disabled"></div>
      )}
    </>
  );
};

export default AlgoPic;
