import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Upload } from "./Upload";
import Logout from "./Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMediaQuery } from "@mui/material";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 0px 20px;
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  /* top: 20px;
  position: absolute;
  left: 0; */
`;
const Img = styled.img`
  height: 25px;
`;
const Search = styled.div`
  width: 50%;
  position: absolute;
  left: 0;
  right: 0%;
  height: 2rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cccccc3b;
  border-radius: 18px;
  cursor: text;
  color: ${({ theme }) => theme.textSoft};
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 80%;
  padding-left: 15px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

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

// const DropdownItem = styled.button`
//   padding: 10px;
//   background: none;
//   border: none;
//   color: ${({ theme }) => theme.text};
//   cursor: pointer;
//   text-align: left;

//   &:hover {
//     background-color: ${({ theme }) => theme.soft};
//   }
// `;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const StyledSearchIcon = styled(SearchOutlinedIcon)`
  cursor: pointer;
 
  width: 15%;
  height: inherit;
  font-size: 1.6 !important; // Added !important to override any default styles
`;
const StyledMenuIcon = styled(MenuIcon)`
  color: ${({ theme }) => theme.text};
`;
const StyledSearchIcon2 = styled(SearchOutlinedIcon)`
font-size: 2 !important;
color: ${({ theme }) => theme.textSoft};
`;
const StyledArrowBackIcon = styled(ArrowBackIcon)`
  font-size: 2 !important;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
  position: absolute;
  left: 0;
`;

const IconButton = styled.button`
  border-radius:16px;
  padding:4px;
`

export const Navbar = ({handleOpen}) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.image);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [searchView, setSearchView] = useState(false);
  const handleSearch = () => {
    if (q.trim()) {
      navigate(`/search?q=${q}`);
    }
    setSearchView(false)
  };

  // Function to handle key press events
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Add keydown event listener
    window.addEventListener("keydown", handleKeyPress);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [q]);

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

  return (
    <>
      <Container>
        <Wrapper>
          {searchView ? (
            <>
            <StyledArrowBackIcon onClick={() => setSearchView(false)} />
            <Search className="w-full">
              <Input
                placeholder="Search"
                onChange={(e) => setQ(e.target.value)}
                autoFocus
              />
              <div className="w-[15%] bg-[#343536] h-[inherit] rounded-[13px] rounded-l-none sm:pl-3 pl-1 pt-1"> <StyledSearchIcon
                    onClick={handleSearch}
                  /></div>
            </Search>
            </>
          ) : (
            <>
              <div className="absolute left-0 md:left-2 z-30">
                <StyledMenuIcon onClick={handleOpen} />
              </div>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
                className="absolute left-10 md:left-[3.5rem] "
              >
                <Logo>
                  <Img src="/img/logo.png" />
                  WeTube
                </Logo>
              </Link>
              {isSmallScreen ? (
                <IconButton
                  onClick={() => setSearchView(true)}
                  className="cursor-pointer hover:bg-[#343536]"
                >
                  <StyledSearchIcon2 className="w-[100%]" />
                </IconButton>
              ) : (
                <Search className="ml-[10%]">
                  <Input
                    placeholder="Search"
                    onChange={(e) => setQ(e.target.value)}
                  />
                  <div className="w-[15%] bg-[#343536] h-[inherit] rounded-[13px] rounded-l-none pl-3 pt-1"> <StyledSearchIcon
                    onClick={handleSearch}
                  /></div>
                 
                </Search>
              )}
              {currentUser ? (
                <User ref={dropdownRef}>
                  <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
                  <Avatar
                    src={currentUser.img}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  />
                  {currentUser.name}
                  {dropdownOpen && (
                    <DropdownMenu>
                      <Logout />
                    </DropdownMenu>
                  )}
                </User>
              ) : (
                <Link to="signin" style={{ textDecoration: "none" }}>
                  <Button>
                    <AccountCircleOutlinedIcon />
                    SIGN IN
                  </Button>
                </Link>
              )}
            </>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};
