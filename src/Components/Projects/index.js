import React, { useState } from 'react'
import { 
  Container, 
  Wrapper, 
  Title, 
  Desc, 
  CardContainer, 
  ToggleButtonGroup, 
  ToggleButton, 
  Divider 
} from './ProjectStyle'
import ProjectCard from '../Cards/ProjectCard'
import { projects } from '../../Data/Constants'

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Filter projects based on toggle
  const filteredProjects = toggle === 'all'
    ? projects
    : projects.filter((item) => item.category === toggle);

  // Show only 3 unless "Show More" clicked
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>

        {/* Toggle Buttons */}
        <ToggleButtonGroup>
          {toggle === 'all'
            ? <ToggleButton active value="all" onClick={() => { setToggle('all'); setShowAll(false); }}>All</ToggleButton>
            : <ToggleButton value="all" onClick={() => { setToggle('all'); setShowAll(false); }}>All</ToggleButton>}
          <Divider />
          {toggle === 'web app'
            ? <ToggleButton active value="web app" onClick={() => { setToggle('web app'); setShowAll(false); }}>WEB APP'S</ToggleButton>
            : <ToggleButton value="web app" onClick={() => { setToggle('web app'); setShowAll(false); }}>WEB APP'S</ToggleButton>}
          <Divider />
          {toggle === 'android app'
            ? <ToggleButton active value="android app" onClick={() => { setToggle('android app'); setShowAll(false); }}>ANDROID APP'S</ToggleButton>
            : <ToggleButton value="android app" onClick={() => { setToggle('android app'); setShowAll(false); }}>ANDROID APP'S</ToggleButton>}
        </ToggleButtonGroup>

        {/* Project Cards */}
        <CardContainer>
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          ))}
        </CardContainer>

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 3 && (
          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: '#843BCE',
              color: '#fff',
              fontWeight: '500'
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </Wrapper>
    </Container>
  )
}

export default Projects;
