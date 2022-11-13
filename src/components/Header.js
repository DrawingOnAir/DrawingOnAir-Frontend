import React from "react";
import { BsQuestionCircle } from "react-icons/bs";

import styled from "styled-components";

function Header() {
  const handleClick = (event) => {
    event.preventDefault();
    // TO-Change : openModal();
  };

  return (
    <HeaderContainer>
      <ExplainIcon title="Guide for Using AirDrawing" onClick={handleClick} />
      <HeaderTitle>
        <HeaderTitleAir>Air </HeaderTitleAir>
        <HeaderTitleDrawing>Drwaing</HeaderTitleDrawing>
      </HeaderTitle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9vh;
  border-bottom: 0.1rem solid;
`;

const ExplainIcon = styled(BsQuestionCircle)`
  position: fixed;
  top: 1.8%;
  left: 2%;
  font-size: 2rem;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  position: relative;
  width: 80%;
  font-weight: 400;
  font-size: 2rem;
  text-align: center;
`;

const HeaderTitleAir = styled.span`
  font-family: "IrishGrover";
`;

const HeaderTitleDrawing = styled.span`
  font-family: "JacquesFrancois";
`;

export default Header;
