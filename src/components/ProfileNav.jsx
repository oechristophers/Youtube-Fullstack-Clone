import React from "react";
import Logout from "./Logout";
import styled from "styled-components";
import { Edit, Settings, VideoCall } from "@mui/icons-material";

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export default function ProfileNav() {
  return (
    <div>
      <DropdownMenu>
        <a
          href="/profile/edit"
          className="flex gap-5 w-48 hover:bg-[rgba(225,216,216,0.06)] "
        >
          <Edit /> Edit Profile
        </a>
        <a
          href="/profile/settings"
          className="flex gap-5 w-48 hover:bg-[rgba(225,216,216,0.06)] "
        >
          <Settings /> Settings
        </a>
        <a
          href="/my-channel"
          className="flex gap-5 w-48 hover:bg-[rgba(225,216,216,0.06)] "
        >
          <VideoCall /> Channel
        </a>
        <Logout />
      </DropdownMenu>
    </div>
  );
}
