import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import LINE_THICKNESSES from "../config/lineThicknesses";
import PAGE_COLORS from "../config/pageColors";
import { changelineThicknesses } from "../features/selectLineThicknessReducer";

function LineBar() {
  const dispatch = useDispatch();

  const handleClick = (event, thickness) => {
    event.preventDefault();
    dispatch(changelineThicknesses(thickness));
  };

  return (
    <LineContainer>
      {LINE_THICKNESSES.map((thickness) => {
        return (
          <LineThickness
            key={thickness}
            thickness={thickness}
            onClick={(event) => handleClick(event, thickness)}
          />
        );
      })}
    </LineContainer>
  );
}

const LineContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  right: -3%;
  position: absolute;
  width: 10%;
  height: 100%;
  text-align: center;
  z-index: 9999;
`;

const LineThickness = styled.div`
  width: ${(props) => `${props.thickness}px`};
  height: 3rem;
  margin: 1rem 3rem;
  background-color: ${PAGE_COLORS.FONT_COLOR};
  transform: rotate(-45deg);
  cursor: pointer;
`;

export default LineBar;
