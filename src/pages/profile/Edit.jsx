import React from "react";
import ProfileForm from "../../components/ProfileForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Edit() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?.user?._id || currentUser._id;
  const userName = currentUser?.user?.name || currentUser.name;
  const userEmail = currentUser?.user?.email || currentUser.email;
  // console.log(currentUser);
  return (
    <div className="text-white ">
      <ProfileForm
        userId={userId}
        userEmail={userEmail}
        userName={userName}
      />
    </div>
  );
}
