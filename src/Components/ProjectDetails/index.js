import { CloseRounded } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
`;
const ImageGallery = styled.div` 
max-height: 400px; 
 overflow-y: auto; 
 display: flex;
  flex-direction: column; 
 gap: 12px; padding-right: 8px;
 `;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 12px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0px;
  gap: 12px;
`;

const Button = styled.button`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  border: none;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary + 99};
  }
`;

const ProjectModal = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  const [showImages, setShowImages] = useState(false);

  return (
    <Modal
      open={!!openModal.state}
      onClose={() => setOpenModal({ state: false, project: null })}
    >
      <Container>
        <Wrapper>
          <CloseRounded
            style={{ position: "absolute", top: "10px", right: "20px", cursor: "pointer" }}
            onClick={() => setOpenModal({ state: false, project: null })}
          />

          {/* Toggle between details and gallery */}
          {!showImages ? (
            <>
              <Image src={project?.image} alt={project?.title} />
              <h2>{project?.title}</h2>
              <p>{project?.date}</p>
              <p>{project?.description}</p>

              <ButtonGroup>
                {project?.images && (
                  <Button onClick={() => setShowImages(true)}>View Images</Button>
                )}
                {project?.webapp && (
                  <Button as="a" href={project.webapp} target="new">
                    View Live App
                  </Button>
                )}
              </ButtonGroup>
            </>
          ) : (
            <>
              <h3 style={{ textAlign: "center" }}>Project Images</h3>
               <ImageGallery> {project?.images?.map((img, i) => 
               ( <Image key={i} src={img} alt={`Project ${i}`} />

                ))} </ImageGallery>
                 <ButtonGroup>
                     <Button onClick={() => setShowImages(false)}>Back to Details
                     </Button> 
                     </ButtonGroup>
            </>
          )}
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default ProjectModal;
