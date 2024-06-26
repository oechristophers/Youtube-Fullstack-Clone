import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  height: fit-content;
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 20px;
  padding: 5px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom:2rem;
  color: ${({ theme }) => theme.text};
  /* top: 20px;
  position: absolute;
  left: 0; */
`;
const Img = styled.img`
  height: 25px;
`;

const Hr = styled.hr`
  margin: 8px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode, open, handleClose }) => {
  const {currentUser} = useSelector(state=>state.user)

  
  return (
    <Container>
      <Wrapper>
        <div className={` ${open ? 'flex' : 'hidden'}`}>
      <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
                
              >
                <Logo>
                  <Img src="/img/logo.png" />
                  WeTube
                 
                </Logo>
              </Link> <span onClick={handleClose} className="ml-6">
                    <CloseIcon/>
                  </span>
                  </div>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
           <span className={` ${open ? 'block' : 'hidden'}`}>Home</span> 
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            <span className={` ${open ? 'block' : 'hidden'}`}>Explore</span> 
            
          </Item>
        </Link>
        <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SubscriptionsOutlinedIcon />
            <span className={` ${open ? 'block' : 'hidden'}`}>Subscriptions</span> 
            
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Library</span> 
          
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>History</span> 
          
        </Item>
        <Hr />
       {!currentUser && open && <>
        <Login className="w-[20ch]">
          Sign in to like videos, comment and subscribe.
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </Login>
        <Hr />
        </>}
        
        <Title> <span className={` ${open ? 'block' : 'hidden'}`}>BEST OF WETUBE</span> </Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Music</span> 
          
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Sports</span> 
          
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Gaming</span> 
          
        </Item>
        <Item>
          <MovieOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Movies</span> 
          
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>News</span> 
          
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Live</span> 
          
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Settings</span> 
          
        </Item>
        <Item>
          <FlagOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Report</span> 
         
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>Help</span> 
          
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          <span className={` ${open ? 'block' : 'hidden'}`}>  {darkMode ? "Light" : "Dark"} Mode</span> 
        
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
