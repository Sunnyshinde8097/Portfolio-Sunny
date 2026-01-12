import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

import { darkTheme, lightTheme } from "./utils/Themes.js";
import Navbar from "./Components/NavBar";
import HeroSection from "./Components/HeroSection";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import Contact from "./Components/Contacts";
import Footer from "./Components/Footer";
import ProjectDetails from "./Components/ProjectDetails";
import "./App.css";

// Styled wrappers
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  // Dark/Light mode state
  const [darkMode, setDarkMode] = useState(true);

  // Persist theme choice in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Project modal state
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  // Toggle theme handler
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router basename={process.env.PUBLIC_URL}>
        {/* Navbar receives darkMode + toggleTheme */}
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

        <Body>
          {/* Hero Section */}
          <HeroSection />

          {/* Skills + Projects + Experience */}
          <Wrapper>
            <Skills />
            <Projects setOpenModal={setOpenModal} />
            <Experience />
          </Wrapper>

          {/* Contact Section */}
          <Wrapper>
            <Contact />
          </Wrapper>

          {/* Footer */}
          <Footer />

          {/* Project Details Modal */}
          {openModal.state && (
            <ProjectDetails
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
