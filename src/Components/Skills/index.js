import React from 'react'
import styled from 'styled-components'
import { skills } from '../../Data/Constants'

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1100px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
margin-top: 12px;
      font-size: 32px;
  }
`;

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854CE6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }


`

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  text-align: center;
`

const SkillList = styled.div`
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`

const SkillItem = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary + 40};
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.card_light};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(133, 76, 230, 0.25) 0px 4px 12px;
    border-color: #854CE6;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const SkillIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

const Skills = () => {
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>Here are some of my skills on which I have been working on for the past 3.3 years.
        </Desc>
        <SkillsContainer>
          {skills.map((skill) => (
            <Skill>
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
              {skill.skills.map((item) => (
                 <SkillItem key={item.name}>
                {item.image && (
                   <SkillIcon src={item.image} alt={item.name} />
               )}
              {item.name}
              </SkillItem>
               ))}
              </SkillList>
            </Skill>
          ))}

        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills