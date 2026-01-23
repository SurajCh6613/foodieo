import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfileModal from "../../components/profile/EditProfileModal";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(null);
  return (
    <div className="px-6 py-6 h-full space-y-2">
      <div className="text-xl shadow py-2 px-4 ">
        <h2>Name: {user?.fullName}</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-2 py-1 shadow cursor-pointer mt-2"
        >
          Update Profile
        </button>
      </div>

      {isEditing && <EditProfileModal setIsEditing={setIsEditing} />}
    </div>
  );
};

export default MyProfile;
