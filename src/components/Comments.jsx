import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
button{
  border-bottom: 1px solid ${({ theme }) => theme.soft};
}
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const setAuthToken = (config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId]);

  

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    
    const config = {
      headers: {}
    };
    setAuthToken(config);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/comments`,
        {
          videoId,
          desc: newComment,
        },
        config
      );
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img ||currentUser?.user?.img} />
        <form onSubmit={handleCommentSubmit} style={{ width: '100%', display:'flex' }}>
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="text-white">Send</button>
        </form>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} currentUser={currentUser} comments={comments} setComments={setComments} />
      ))}
    </Container>
  );
};

export default Comments;
