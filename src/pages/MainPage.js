import React from "react";
import WebCam from "react-webcam";

import styled from "styled-components";

import LineBar from "../components/LineBar";
import ColorBar from "../components/ColorBar";

function MainPage() {
  return (
    <MainPageContainer>
      <WebCamera />
      <Canvas />
      <LineBar />
      <ColorBar />
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const WebCamera = styled(WebCam)`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

export default MainPage;
