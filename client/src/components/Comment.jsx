import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import {format} from 'timeago.js';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`
const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 1px;
color:${({ theme }) => theme.text};
`
const Name = styled.div`
font-size: 12px;
font-weight: 500;
`
const Date = styled.div`
font-size: 11px;
font-weight: 400;
color:${({ theme }) => theme.textSoft} ;
margin-left: 5px;
`
const Text = styled.div`
font-size: 14px;
`

const Button = styled.button`
position: relative;
`


const StyledMoreButton = styled(MoreVertIcon)`
color:${({ theme }) => theme.textSoft};
`
const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DropdownItem = styled.button`
  padding: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Comment = ({ comment, currentUser, comments, setComments }) => {
  const [channel, setChannel] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const setAuthToken = (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`http://localhost:8800/api/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);
  
  const handleDelete = async () => {
    try {
      const config = {
        headers: {},
      };
      setAuthToken(config);

      await axios.delete(`http://localhost:8800/api/comments/${comment._id}`, config);
      // Filter out the deleted comment from comments state
      const updatedComments = comments.filter((c) => c._id !== comment._id);
      setComments(updatedComments);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };
  return (
    <Container>
        <Avatar src={channel.img}/>
        <Details>
            <Name className='flex'>{channel.name} <Date>{format(comment.createdAt)}</Date></Name>
            <Text className=''>
               {comment.desc}
            </Text>
        </Details>

        {currentUser._id &&
      <Button className='pb-2 ml-auto' ref={dropdownRef}>
        <StyledMoreButton onClick={() => setDropdownOpen((prev) => !prev)} />
        {dropdownOpen && (
                    <DropdownMenu className='z-30'>
                      <DropdownItem onClick={handleDelete}>
                      Delete
                      </DropdownItem>
                    </DropdownMenu>
                  )}
      </Button>}
    </Container>
  )
}

export default Comment