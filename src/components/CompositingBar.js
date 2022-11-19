import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import COMPOSITING_TYPE from "../config/compositingType";
import { changeCompositingType } from "../features/compositeDataReducer";

function CompositingBar() {
  const dispatch = useDispatch();
  const handleClick = (event, type) => {
    event.preventDefault();
    dispatch(changeCompositingType(type));
  };

  return (
    <CompositingContainer>
      {COMPOSITING_TYPE.map((type) => {
        return (
          <CompositingTypeBox
            key={type}
            onClick={(event) => handleClick(event, type)}
          >
            {type}
          </CompositingTypeBox>
        );
      })}
    </CompositingContainer>
  );
}

const CompositingContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  /* bottom: 0%; */
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 9999;
`;

const CompositingTypeBox = styled.div`
  width: 5%;
  height: 10%;
  padding-top: 1.7rem;
  border: 1px solid;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default CompositingBar;
