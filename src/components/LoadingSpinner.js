import React from "react";
import styled from "styled-components";

import PAGE_COLORS from "../config/pageColors";

function LoadingSpinner() {
  return (
    <LoadingSpinnerContainer>
      <LoadingSpinnerBar>
        Loading
        <LoaddingSpinnerSpan />
      </LoadingSpinnerBar>
    </LoadingSpinnerContainer>
  );
}

const LoadingSpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingSpinnerBar = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  width: 10rem;
  height: 10rem;
  border: 3px solid ${PAGE_COLORS.FONT_COLOR};
  border-radius: 50%;
  background: transparent;
  color: ${PAGE_COLORS.LOADING_COLOR};
  text-align: center;
  line-height: 10rem;
  letter-spacing: 0.25rem;
  text-transform: uppercase;
  text-shadow: 0 0 10px ${PAGE_COLORS.LOADING_COLOR};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
`;

const LoaddingSpinnerSpan = styled.span`
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 0.25rem;
  background: transparent;
  transform-origin: left;
  animation: circleAnimation 4.5s linear infinite;

  @keyframes circleAnimation {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: -0.376rem;
    right: -0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${PAGE_COLORS.LOADING_COLOR};
    box-shadow: 0 0 20px ${PAGE_COLORS.LOADING_COLOR};
  }
`;

export default LoadingSpinner;
