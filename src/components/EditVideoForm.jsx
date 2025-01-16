import React, { useState } from "react";
import { uploadToFirebase } from "../lib/uploadFunction";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchSuccess } from "../redux/videoSlice";
import app from "../firebase";

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
`;
export default function EditVideoForm({ videoName, userId, videoId, refetch, onClose }) {
  const [formData, setFormData] = useState({
    title: videoName,
  });
  const [coverPic, setCoverPic] = useState("/img/default.webp");
  const [preview, setPreview] = useState(coverPic);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch(); // Move this hook here

  // console.log("Current video:", currentVideo);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlecoverPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setCoverPic(file); // Save the file for upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true); // Indicate upload is in progress

      let coverPicUrl = coverPic;

      // Upload coverPic to Firebase if it's a File
      if (coverPic instanceof File) {
        coverPicUrl = await uploadToFirebase(app, userId, coverPic);
        // console.log("cover picture URL:", coverPicUrl);
      }

      // Prepare data for the backend
      const updatedData = {
        ...formData,
        imgUrl: coverPicUrl,
      };

      // Retrieve token from localStorage
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error(
          "Authentication token is missing. Please log in again."
        );
      }

      // Make the PUT request to update the user
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/videos/${videoId}`,
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
        throw new Error(
          errorData.message || "Failed to update cover. Please try again."
        );
      }

      const result = await response.json();
      console.log("cover updated successfully:", result);

      // Dispatch Redux action to update state
       dispatch(fetchSuccess(response.data));
      alert("cover updated successfully!");
      refetch(); // Refresh the video list
      onClose();
    } catch (error) {
      console.error("Error updating cover:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsUploading(false); // Reset the uploading state
    }
  };

  return (
    <div
      className="px-5 w-full  "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h2>Edit your Video</h2>
      <div className="">
        <form
          className="flex-1 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="relative rounded-md w-66 flex justify-center h-32 border-4">
            <img
              src={preview}
              alt="cover"
              className="max-h-full max-w-full rounded-md"
            />
          </div>
          <label
            htmlFor="coverPicInput"
            className="mt-4 bg-blue-600 text-center hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
          >
            Update Profile Picture
          </label>
          <Input
            id="coverPicInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlecoverPicChange}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Video Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
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
}
