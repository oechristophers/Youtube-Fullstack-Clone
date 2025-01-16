import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendations from "../components/Recommendations";
import { format } from "timeago.js";

//styled components from styled

const Content = styled.div`
  /* flex: 5; */
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  align-items: center;
  justify-content: space-between;
  margin: 1px 0px;
  background-color: ${({ theme }) => theme.soft};
`;

const Info = styled.span`
  color: ${({ theme }) => theme.text};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
`;
const Bdiv = styled.div`
  background-color: ${({ theme }) => theme.soft};
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  column-gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Subscribe = styled.button`
  color: ${({ theme }) => !theme.text};
  background-color: white;
  font-weight: 500;
  border: none;
  height: max-content;
  padding: 8px 13px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Subscribed = styled.button`
  color: white;
  background-color: red;
  font-weight: 500;
  border: none;
  height: max-content;
  padding: 8px 13px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const ChannelCounter = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const VideoFrame = styled.video`
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    max-height: 250px;
  }
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(currentVideo);
        console.log(currentUser?.subscribedUsers);
        console.log(currentUser?.user?.subscribedUsers);
        const videoRes = await axios.get(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/find/${
            videoRes.data.userId
          }`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/like/${
          currentVideo._id
        }`,
        {},
        config
      );
      dispatch(like(currentUser._id));
    } catch (error) {
      console.error("Error liking the video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/dislike/${
          currentVideo._id
        }`,
        {},
        config
      );
      dispatch(dislike(currentUser._id));
    } catch (error) {
      console.error("Error disliking the video:", error);
    }
  };

  const handleSub = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      const actionUrl =
        currentUser?.subscribedUsers?.includes(channel._id) ||
        currentUser?.user?.subscribedUsers?.includes(channel._id)
          ? `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/unsub/${
              channel._id
            }`
          : `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/sub/${
              channel._id
            }`;

      await axios.put(actionUrl, {}, config);
      dispatch(subscription(channel._id));
    } catch (error) {
      console.error("Error subscribing/unsubscribing:", error);
    }
  };

  const subscribedUsers =
    currentUser?.subscribedUsers?.includes(channel._id) ||
    currentUser?.user?.subscribedUsers?.includes(channel._id);

  return (
    <div className="lg:flex gap-[24px] justify-center w-full py-6  ">
      <Content className="mb-4 w-full lg:w-[650px]   ">
        <VideoWrapper className="ml-[-6%] sm:ml-[0] w-[100vw] md:px-20 lg:px-0 sm:w-full">
          {currentVideo ? (
            <VideoFrame
              src={currentVideo.videoUrl}
              controls
              className="sm:rounded-2xl"
            />
          ) : (
            <p>Loading...</p>
          )}
        </VideoWrapper>
        {currentVideo && (
          <>
            <Title>{currentVideo.title}</Title>
            <Channel>
              <ChannelInfo className="">
                <Image src={channel.img} className="" />
                <ChannelDetail className="">
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} Subscribers
                  </ChannelCounter>
                </ChannelDetail>
              </ChannelInfo>
              {subscribedUsers ? (
                <Subscribed onClick={handleSub} className="rounded-full">
                  Subscribe
                </Subscribed>
              ) : (
                <Subscribe onClick={handleSub} className="rounded-full">
                  Subscribed
                </Subscribe>
              )}
              <Buttons>
                <Bdiv className="rounded-full h-fit flex items-center gap-3  py-2 px-4 text-xs ">
                  <Button onClick={handleLike} className="">
                    {currentVideo.likes?.includes(currentUser?._id) ||
                    currentVideo.dislikes?.includes(currentUser?.user?._id) ? (
                      <ThumbUpIcon className="" style={{ fontSize: "15px" }} />
                    ) : (
                      <ThumbUpOutlinedIcon
                        className=""
                        style={{ fontSize: "15px" }}
                      />
                    )}{" "}
                    {currentVideo.likes?.length}
                  </Button>
                  <Span className="text-[1.7rem] font-thin pb-1">|</Span>
                  <Button onClick={handleDislike}>
                    {currentVideo.dislikes?.includes(currentUser?._id) ||
                    currentVideo.dislikes?.includes(currentUser?.user?._id) ? (
                      <ThumbDownIcon style={{ fontSize: "15px" }} />
                    ) : (
                      <ThumbDownOffAltOutlinedIcon
                        style={{ fontSize: "15px" }}
                      />
                    )}{" "}
                  </Button>
                </Bdiv>
                <Button className="rounded-full  justify-center h-fit py-2 px-4 text-sm gap-10">
                  <ReplyOutlinedIcon style={{ fontSize: "15px" }} /> Share
                </Button>
                <Button className="rounded-full w-24 justify-center h-fit  py-2 text-sm gap-10">
                  <AddTaskOutlinedIcon style={{ fontSize: "15px" }} /> Save
                </Button>
              </Buttons>
            </Channel>
            <Hr />
            <Details className="rounded-md justify-center p-6">
              <Info>
                {currentVideo.views} views • {format(currentVideo.createdAt)}
              </Info>
              <Description className=" w-[100%]">
                {currentVideo.desc}
              </Description>
            </Details>
            <Hr />
            <Comments videoId={currentVideo._id} />
          </>
        )}
      </Content>
      {currentVideo && (
        <Recommendations type="sm" tags={currentVideo.tags} className="" />
      )}
    </div>
  );
};

export default Video;
