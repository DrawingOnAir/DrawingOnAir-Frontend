import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import COMPOSITE_TYPE from "../config/compositeType";
import { changeCompositeType } from "../features/compositeDataReducer";

function CompositeBar() {
  const dispatch = useDispatch();
  const handleClick = (event, type) => {
    event.preventDefault();
    dispatch(changeCompositeType(type));
  };

  return (
    <CompositeContainer>
      {COMPOSITE_TYPE.map((type) => {
        return (
          <CompositeTypeBox
            key={type}
            onClick={(event) => handleClick(event, type)}
          >
            {type}
          </CompositeTypeBox>
        );
      })}
    </CompositeContainer>
  );
}

const CompositeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 9999;
`;

const CompositeTypeBox = styled.div`
  width: 5%;
  height: 10%;
  padding-top: 1.7rem;
  border: 1px solid;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default CompositeBar;
