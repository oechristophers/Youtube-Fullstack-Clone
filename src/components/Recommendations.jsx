import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Card } from './Card';
import axios from 'axios';

const Container = styled.div`
  /* flex: 2.9; */
`;


const Recommendations = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
        {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Recommendations