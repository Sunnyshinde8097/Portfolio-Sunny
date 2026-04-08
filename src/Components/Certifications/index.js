import React from 'react'
import styled from 'styled-components'
import CertificationCard from '../Cards/CertificationCard'
import { certifications } from '../../Data/Constants'

const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
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

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    margin-top: 30px;
`;

const Certifications = () => {
    // Return null or empty if there are no certifications
    if (!certifications || certifications.length === 0) return null;

    return (
        <Container id="certifications">
            <Wrapper>
                <Title>Certifications</Title>
                <Desc>
                    Here are some of the certifications I have earned to improve my skills and stay updated with the latest technologies.
                </Desc>
                <CardContainer>
                    {certifications.map((certification, index) => (
                        <CertificationCard key={index} certification={certification} />
                    ))}
                </CardContainer>
            </Wrapper>
        </Container>
    )
}

export default Certifications;
