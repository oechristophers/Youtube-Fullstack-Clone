import React, { useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice"; // Adjust the import path as needed
import { uploadToFirebase } from "../lib/uploadFunction";

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
`;
const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.bgLighter};
`;
const ProfileForm = ({ userId, userName, userEmail }) => {
  const [formData, setFormData] = useState({
    email: userEmail,
    name: userName,
  });
  const storage = getStorage(app)
  const [profilePic, setProfilePic] = useState("/img/default.webp");
  const [preview, setPreview] = useState(profilePic);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch(); // Move this hook here

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setProfilePic(file); // Save the file for upload
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsUploading(true); // Indicate upload is in progress
  
      let profilePicUrl = profilePic;
  
      // Upload profilePic to Firebase if it's a File
      if (profilePic instanceof File) {
        profilePicUrl = await uploadToFirebase(app, userId, profilePic);
        console.log("Profile picture URL:", profilePicUrl);
      }
  
      
      // Prepare data for the backend
      const updatedData = {
        ...formData,
        img: profilePicUrl,
      };
  
      // Retrieve token from localStorage
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
      }
  
      // Make the PUT request to update the user
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile. Please try again.");
      }
  
      const result = await response.json();
      console.log("Profile updated successfully:", result);
  
      // Dispatch Redux action to update state
      dispatch(updateUser(updatedData));
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsUploading(false); // Reset the uploading state
    }
  };
  

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-5">
      <div className="shadow-lg p-8 w-full max-w-3xl flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center">
          <div className="relative rounded-full w-32 h-32 border-4">
            <img
              src={preview}
              alt="Profile"
              className="max-h-full max-w-full rounded-full"
            />
          </div>
          <label className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
            Update Profile Picture
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </label>
        </div>
        <form className="flex-1 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-4"
          >
            {isUploading ? "Uploading..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
