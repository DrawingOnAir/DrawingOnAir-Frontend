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
          <CompositingTypeButton
            key={type.name}
            title={type.explanation}
            onClick={(event) => handleClick(event, type.name)}
          >
            {type.name}
          </CompositingTypeButton>
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
  width: 5%;
  height: 100%;
  margin-left: 0.3rem;
  text-align: center;
  z-index: 9999;
`;

const CompositingTypeButton = styled.button`
  width: 100%;
  height: 10%;
  margin: 1rem 0 1rem 0;
  border: 1px solid;
  border-radius: 10%;
  text-align: center;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;

  &:hover {
    background-color: rgba(213, 217, 217, 0.5);
  }

  &:focus {
    border-color: rgba(0, 130, 150, 1);
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    outline: 0;
  }
`;

export default CompositingBar;
