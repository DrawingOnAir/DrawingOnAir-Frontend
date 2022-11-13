import React from "react";
import { Route, Routes } from "react-router-dom";

import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import HomePage from "../pages/HomePage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainPage from "../pages/MainPage";

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <MainSection>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
