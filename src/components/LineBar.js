import React from "react";

import styled from "styled-components";

import LINE_THICKNESSES from "../config/lineThicknesses";
import PAGE_COLORS from "../config/pageColors";

function LineBar() {
  return (
    <LineContainer>
      {LINE_THICKNESSES.map((thickness) => {
        return <LineThickness thickness={thickness} />;
      })}
    </LineContainer>
  );
}

const LineContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 1%;
  width: 100%;
  z-index: 9999;
`;

const LineThickness = styled.div`
  width: ${(props) => props.thickness};
  height: 3rem;
  margin: 0 3rem 0 1rem;
  background-color: ${PAGE_COLORS.FONT_COLOR};
  transform: rotate(-45deg);
  cursor: pointer;
`;

export default LineBar;
