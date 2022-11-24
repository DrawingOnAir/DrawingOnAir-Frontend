import { createGlobalStyle } from "styled-components";

import PAGE_COLORS from "../config/pageColors";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${PAGE_COLORS.FONT_COLOR};
    user-select: none;
  }

  body {
    background: ${PAGE_COLORS.MAIN_BACKGROUND};
    overflow: hidden;
    font: 16px 'Nunito', sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
