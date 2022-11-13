import React from "react";

import styled from "styled-components";

import PAGE_COLORS from "../config/pageColors";

function Footer() {
  const handleClick = () => {};

  return (
    <FooterContainer>
      <FooterButton onClick={handleClick}>Main</FooterButton>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9vh;
  border-top: 0.1rem solid;
`;

const FooterButton = styled.button`
  --borderThickness: 1.5px;
  --cornerSize: 0.4rem;
  --color: ${PAGE_COLORS.FONT_COLOR};
  --backgroundColor: ${PAGE_COLORS.BUTTON_BACKGROUND};
  --line: var(--cornerSize);

  width: 6rem;
  height: 3rem;
  padding: calc(0.5rem + var(--cornerSize)) calc(0.9rem + var(--cornerSize));
  border: 0;
  background: conic-gradient(
      from 90deg at var(--borderThickness) var(--borderThickness),
      var(--backgroundColor) 90deg,
      var(--color) 0
    )
    var(--line) var(--line) /
    calc(100% - var(--borderThickness) - 2 * var(--line))
    calc(100% - var(--borderThickness) - 2 * var(--line));
  color: var(--color);
  transition: 0.3s linear, color 0s, background-color 0s;
  outline: var(--borderThickness) solid var(--backgroundColor);
  outline-offset: 0.6rem;
  cursor: pointer;

  &:hover,
  :focus-visible {
    --line: 0rem;
    outline-color: var(--color);
    outline-offset: 0.05rem;
  }

  &:active {
    background: var(--color);
    color: ${PAGE_COLORS.BUTTON_FONT_CHANGE_COLOR};
  }
`;

export default Footer;
