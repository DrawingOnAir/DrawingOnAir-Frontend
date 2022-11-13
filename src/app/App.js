import React from "react";

import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import HomePage from "../pages/HomePage";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <MainSection>
        <Header />
        <HomePage />
        <Footer />
      </MainSection>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const MainSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default App;
