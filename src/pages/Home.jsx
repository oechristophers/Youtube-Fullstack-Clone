import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import axios from "axios";
import { CardSkeleton } from "../components/CardSkeleton";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
    @media screen and (min-width: 770px) {
    padding-left: 100px;
  }
`;

export const Home = ({ type, requiresAuth }) => {
  const [videos, setVideos] = useState([]);
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Define fetchVideos as a stable function using useCallback
  const fetchVideos = useCallback(async () => {
    try {
      const config = {};
      if (requiresAuth) {
        const token = localStorage.getItem("access_token");
        config.headers = { Authorization: `Bearer ${token}` };
      }
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/videos/${type}`,
        config
      );
      setVideos(res.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }, [type, requiresAuth]);

  // Initial fetch of videos
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <Container className="grid  grid-cols-1 sm:px-20 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
      {videos.length === 0 &&
        skeletonArray.map((i) => <CardSkeleton key={i} />)}
      {videos.map((video) => (
        <Card key={video._id} video={video} refetch={fetchVideos} />
      ))}
    </Container>
  );
};
