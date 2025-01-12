import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Card } from './Card';
import axios from 'axios';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;


const UserVideos = ({ userId }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/videos/userId?userId=${userId}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [userId]);
  return (
    <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 ">
        {videos.map((video) => (
        <Card  key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default UserVideos