import React from "react";

import styled from "styled-components";

import CIRCLE_COLORS from "../config/circleColors";

function ColorBar() {
  return (
    <ColorContainer>
      {CIRCLE_COLORS.map((color) => {
        return <ColorCircle key={color} color={color} />;
      })}
    </ColorContainer>
  );
}

const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1%;
  width: 100%;
  z-index: 9999;
`;

const ColorCircle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.5rem 0 0.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

export default ColorBar;
