import React from 'react'
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavBarstyledComponents'
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../Data/Constants';
import { useTheme } from 'styled-components';
import styled from "styled-components";

// Toggle button styled component
const ToggleButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-weight: 600;
  margin-left: 12px;
`;

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <div style={{ display: "flex", alignItems: "center", color: "white", marginBottom: '20px', cursor: 'pointer' }}>
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </div>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href='#skills'>Skills</NavLink>
          <NavLink href='#projects'>Projects</NavLink>
          <NavLink href='#experience'>Experience</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
          <ToggleButton onClick={toggleTheme}>
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </ToggleButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => setIsOpen(!isOpen)}>About</MobileLink>
            <MobileLink href='#skills' onClick={() => setIsOpen(!isOpen)}>Skills</MobileLink>
            <MobileLink href='#experience' onClick={() => setIsOpen(!isOpen)}>Experience</MobileLink>
            <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href={Bio.github} target="_blank">Github Profile</GitHubButton>
            <ToggleButton onClick={toggleTheme}>
              {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </ToggleButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar
