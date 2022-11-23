import React from "react";

import styled from "styled-components";

import AirDrawImgaeSrc from "../images/airDrawImgae.png";
import "../fonts/font.css";

function HomePage() {
  return (
    <HomePageContainer>
      <HomePageTitle>
        <HomePageTitleAir>Air </HomePageTitleAir>
        <HomePageTitleDrawing>Drawing</HomePageTitleDrawing>
      </HomePageTitle>
      <HomePageImage src={AirDrawImgaeSrc} />
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const HomePageTitle = styled.div`
  margin: -10rem 0 8rem 0;
  font-weight: 400;
  font-size: 6rem;
  white-space: nowrap;
`;

const HomePageTitleAir = styled.span`
  font-family: "IrishGrover";
`;

const HomePageTitleDrawing = styled.span`
  font-family: "JacquesFrancois";
`;

const HomePageImage = styled.img`
  width: 8vw;
  height: 8vw;
  font-size: 1rem;
  animation: upAndDownAnimation 1s linear 0s infinite alternate;

  @keyframes upAndDownAnimation {
    from {
      transform: translateY(0rem);
    }
    to {
      transform: translateY(-2rem);
    }
  }
`;

export default HomePage;
