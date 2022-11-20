import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import CIRCLE_COLORS from "../config/circleColors";
import { changeColors } from "../features/selectColorReducer";

function ColorBar() {
  const dispatch = useDispatch();

  const handleClick = (event, color) => {
    event.preventDefault();
    dispatch(changeColors(color));
  };

  return (
    <ColorContainer>
      {CIRCLE_COLORS.map((color) => {
        return (
          <ColorCircle
            key={color}
            color={color}
            onClick={(event) => handleClick(event, color)}
          />
        );
      })}
    </ColorContainer>
  );
}

const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1%; //> 적용시에만 나타남
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
