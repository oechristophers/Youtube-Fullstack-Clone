import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Video from "./pages/Video";
import { Home } from "./pages/Home";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import Edit from "./pages/account/profile-edit";
import React from "react";
import Channelpage from "./pages/my-channel";

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bg};
`;

const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 20px;
  flex: 7;
  background-color: ${({ theme }) => theme.bg};

  @media screen and (min-width: 770px) {
    padding-left: 100px;
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Content
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            open={open}
            handleOpen={handleOpen}
            setOpen={setOpen}
          />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

const Content = ({ darkMode, setDarkMode, open, handleOpen, setOpen }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);
  const location = useLocation();
  const shouldShowNav = !location.pathname.includes("/video");

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className={`w-[fit-content] max-h-screen fixed overflow-y-scroll z-30  ${
          open ? "block" : "hidden"
        }  `}
      >
        <Menu
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          className="h-max"
        />
      </div>

      <Navbar className="z-20 " handleOpen={handleOpen} />

      <Main className="md:flex  min-h-screen ">
        {shouldShowNav && (
          <div
            className={`w-[fit-content] md:fixed overflow-y-scroll hidden   ${
              open ? "md:hidden" : "md:block"
            }`}
          >
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} open={open} />
          </div>
        )}
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home type="random" />} />
            <Route path="trends" element={<Home type="trend" />} />
            <Route
              path="subscriptions"
              element={<Home type="sub" requiresAuth={true} />}
            />
            <Route path="search" element={<Search />} />
            <Route path="signin" element={<Signin />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="account/profile-edit" element={<Edit />} />
            <Route path="my-channel" element={<Channelpage />} />
          </Routes>
        </Wrapper>
      </Main>
    </>
  );
};

export default App;
