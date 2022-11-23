import React from "react";
import { BsWind } from "react-icons/bs";

import styled, { keyframes } from "styled-components";

import "../fonts/font.css";

function HomePage() {
  return (
    <HomePageContainer>
      <HomePageTitle>
        <HomePageTitleAir>Air </HomePageTitleAir>
        <HomePageTitleDrawing>Drawing</HomePageTitleDrawing>
      </HomePageTitle>
      <HomePageIcon />
    </HomePageContainer>
  );
}

const upAndDownAnimation = keyframes`
  from
  {
    transform: rotate(180deg) translateY(0rem);
  }
  to
  {
    transform: rotate(180deg) translateY(-2rem);
  } /* 마지막 위치 */
`;

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

const HomePageIcon = styled(BsWind)`
  font-size: 5rem;
  transform: rotate(180deg);
  animation: ${upAndDownAnimation} 1s linear 0s infinite alternate;
`;

export default HomePage;
