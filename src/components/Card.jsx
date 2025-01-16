import {
  AccessTime,
  Delete,
  DeleteOutline,
  Download,
  DownloadOutlined,
  Edit,
  EditOutlined,
  LockClock,
  MoreVert,
  ShareOutlined,
  TurnedInNotOutlined,
  UnsubscribeOutlined,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import EditVideoForm from "./EditVideoForm";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Modal from "./Modal";

const Container = styled.div`
  width: ${(props) => (props.type === "sm" ? "fit-content" : "100%")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "35px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;

  @media (max-width: 620px) {
    // Adjust the max-width value based on what you consider a small screen
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin-left: -20px;
  }

  @media (min-width: 621px) and (max-width: 1024px) {
    width: 100%;
  }
`;
const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "180px" : "100%")};
  min-width: ${(props) => (props.type === "sm" ? "180px" : "")};
  height: ${(props) => (props.type === "sm" ? "85px" : "202px")};

  background-color: #999;

  @media (max-width: 620px) {
    // Adjust the max-width value based on what you consider a small screen
    height: ${(props) => (props.type === "sm" ? "200px" : "15rem")};
    width: 100%;
  }

  @media (min-width: 621px) and (max-width: 758px) {
    height: ${(props) => (props.type === "sm" ? "90px" : "250px")};
  }
  @media (min-width: 759px) and (max-width: 950px) {
    height: ${(props) => (props.type === "sm" ? "90px" : "220px")};
    border-radius: 13px;
    /* Other styles for medium screens */
  }
  @media (min-width: 621px) {
    border-radius: 13px;
  }
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "8px"};
  gap: 12px;
  width: ${(props) => (props.type === "sm" ? "100%" : "")};

  @media (max-width: 620px) {
    padding: 5px 20px;
  }
  @media (min-width: 1024px) {
    max-width: ${(props) => (props.type === "sm" ? "185px" : "")};
    min-width: ${(props) => (props.type === "sm" ? "185px" : "")};
  }
  button {
    color: ${({ theme }) => theme.text};
  }
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 2px 0px;
`;
const ChannelName = styled.h2`
  font-size: 13px;
  color: ${({ theme }) => theme.textSoft};
  margin: 1px 0px;
`;
const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const ChannelImage = styled.img`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const PopOverCon = styled(PopoverContent)`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
const PopTrigger = styled(PopoverTrigger)`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

export const Card = ({ type, video, refetch }) => {
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channel, setChannel] = useState({}); //empty obj not array
  const { currentUser } = useSelector((state) => state.user) || null;
  const userId = currentUser?._id || currentUser?.user?._id;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // console.log(currentUser);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/find/${
          video.userId
        }`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  // console.log(video.userId)
  const isUserVid = video?.userId && userId ? video.userId === userId : false;

  return (
    <>
      <Link
        type={type}
        to={`/video/${video._id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Container type={type}>
          <Image type={type} src={video.imgUrl} loading="lazy" />
          <Details type={type}>
            <ChannelImage type={type} src={channel.img} />
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{channel.name}</ChannelName>
              <Info>
                {video.views} views • {format(video.createdAt)}
              </Info>
            </Texts>
            <div className=" mb-auto ml-auto">
              <Popover open={parentOpen} onOpenChange={setParentOpen}>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    console.log("MoreVert clicked");
                  }}
                  tabIndex="-1" // Exclude from tab focus
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <PopoverTrigger>
                    <MoreVert />
                  </PopoverTrigger>
                </button>
                <PopOverCon>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <AccessTime />
                    <p>Add to Watch Later</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <TurnedInNotOutlined />
                    <p>Add to Playlist</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <DownloadOutlined />
                    <p>Download</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <ShareOutlined />
                    <p>Share</p>
                  </div>

                  {isUserVid && (
                    <>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          toggleModal();
                          setParentOpen();
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <EditOutlined />
                        <p>Edit</p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <DeleteOutline />
                        <p>Delete</p>
                      </div>
                    </>
                  )}

                  {!isUserVid && currentUser !== null && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <UnsubscribeOutlined />
                      <p>Unsubscribe</p>
                    </div>
                  )}
                </PopOverCon>
              </Popover>
            </div>
          </Details>
        </Container>
      </Link>
      {/* Independent child popover */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <EditVideoForm
          videoName={video.title}
          videoId={video._id}
          userId={userId}
          refetch={refetch}
          onClose={toggleModal}
        />
      </Modal>
    </>
  );
};
