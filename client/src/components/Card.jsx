import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from "timeago.js"

const Container = styled.div`
width: 100%;
margin-bottom:${(props)=> props.type === "sm" ? "10px": "35px"};
cursor: pointer;
display: ${(props)=> props.type === "sm" && "grid"};
grid-template-columns:2fr 1fr;
gap: 10px;

@media (max-width: 620px) { // Adjust the max-width value based on what you consider a small screen
  grid-template-columns:${(props)=> props.type === "sm" && "1fr 1fr"}
  }

  @media (min-width: 621px) and (max-width: 1024px) {
    grid-template-columns:${(props)=> props.type === "sm" && "1fr 4fr"}
  }
`
const Image = styled.img`
width: 100%;
height:${(props)=> props.type === "sm" ? "110px":"202px"};
background-color: #999;
border-radius:13px;

@media (max-width: 620px) { // Adjust the max-width value based on what you consider a small screen
    height:${(props)=> props.type === "sm" ? "110px":"18rem"};
  }

  @media (min-width: 621px) and (max-width: 950px) {
    height: ${(props) => (props.type === "sm" ? "90px" : "220px")};
    /* Other styles for medium screens */
  }
`
const Details = styled.div`
display: flex;
margin-top: ${(props)=> props.type !== "sm" && "8px" };
gap: 12px;

`
const Texts = styled.div`

`
const Title = styled.h1`
font-size: 16px;
font-weight: 500;
color:${({theme}) => theme.text} ;
margin: 2px 0px;
`
const ChannelName = styled.h2`
font-size: 13px;
color:${({theme}) => theme.textSoft} ;
margin: 1px 0px;
`
const Info = styled.div`
font-size: 12px;
color:${({theme}) => theme.textSoft} ;
`
const ChannelImage = styled.img`
width: 33px;
height: 33px;
border-radius: 50%;
background-color: #999;
display:${(props)=> props.type === "sm" && "none"} ;
`

export const Card = ({type, video}) => {
  const [channel, setChannel] = useState({}); //empty obj not array

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`http://localhost:8800/api/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link 
    type={type}
    to={`/video/${video._id}`} 
    style={{
      textDecoration: "none" ,
    }}
  >
    <Container type={type} >
        <Image type={type} src={video.imgUrl}/>
        <Details type={type}>
            <ChannelImage type={type} src={channel.img}/>
            <Texts>
                <Title>{video.title}</Title>
                <ChannelName>{channel.name}</ChannelName>
                <Info>{video.views} views • {format(video.createdAt)}</Info>
            </Texts>
        </Details>
    </Container>
    </Link>
  )
}
