import React from 'react';
import Image from 'next/image';

const ProfilePicTiny = ({ profilePicture }) => {
  return (
    <>
      {profilePicture ? (
        <Image
          src={profilePicture}
          alt="Profile picture"
          width={32}
          height={32}
          className="w-8 h-8 rounded-md"
        />
      ) : (
        <div className="w-8 h-8 rounded-md bg-brand-disabled"></div>
      )}
    </>
  );
};

export default ProfilePicTiny;
