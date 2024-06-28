import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '../components/Card'

const Container = styled.div`
    gap: 10px;
`

const Search = () => {
    const [videos, setVideos] = useState([])
    const query = useLocation().search

    useEffect(()=>{
       const fetchVideos = async ()=>{
        const res = await axios.get(`${process.env.VITE_REACT_APP_SERVER_URL}/api/videos/search${query}`)

        setVideos(res.data)
       }
       fetchVideos();
    }, [query]
    )
  return (
    <Container className={` ${videos>1? 'grid md:grid-cols-3': videos>2? 'grid sm:grid-cols-2 md:grid-cols-3' : 'grid md:grid-cols-2 lg:grid-cols-3'}`}>
        {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
    </Container>
  )
}

export default Search