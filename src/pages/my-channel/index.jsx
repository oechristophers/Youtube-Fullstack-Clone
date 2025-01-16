import { Circle } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import UserVideos from "../../components/UserVideos";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  h2 {
    color: ${({ theme }) => theme.text};
  }
  p {
    color: ${({ theme }) => theme.textSoft};
  }
  button {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;
const Dot = styled.div`
  background-color: ${({ theme }) => theme.text};
`;

export default function Channelpage() {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id || currentUser?.user?._id;
  const userImg = currentUser?.img || currentUser?.user?.img;
  const userName = currentUser?.name || currentUser?.user?.name;
  const userSubs = currentUser?.subscribers || currentUser?.user?.subscribers || 0;
  // console.log("Subscribers", userSubs);
  // console.log(currentUser);
  return (
    <Container>
      <Details>
        <div className="relative rounded-full w-32 h-32 border-4">
          <img
            src={userImg}
            alt="Profile"
            className="max-h-full max-w-full rounded-full"
          />
        </div>

        <div>
          <h2 className="text-2xl">{userName}</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm">@{userName}</p>{" "}
            <Dot className="w-1 h-1 rounded-full "></Dot>
            <h4 className="text-sm">
              {userSubs} {userSubs > 1 ? "Subscribers" : "Subscriber"}
            </h4>
          </div>

          <button className="rounded-3xl  p-3 py-1 mt-2">+ Create</button>
        </div>
      </Details>

      <div>
        <div className=" py-3">
          <h3 className="text-lg mt-3 pb-3 border-b mb-6">My Videos</h3>
          <UserVideos userId={userId} />
        </div>
      </div>
    </Container>
  );
}
