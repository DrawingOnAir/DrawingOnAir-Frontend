import React, { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";

import styled from "styled-components";

import setHandsDetector from "../utils/setHandsDetector";
import useInterval from "../hooks/useInterval";
import LineBar from "../components/LineBar";
import ColorBar from "../components/ColorBar";

function MainPage() {
  const [neuralNet, setNeuralNet] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detect = async (network) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const { video } = webcamRef.current;
      const { videoWidth } = webcamRef.current.video;
      const { videoHeight } = webcamRef.current.video;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await network.estimateHands(video);
      const context = canvasRef.current.getContext("2d");
      // draw(hand,context); TO-DO 추가 예정 Draw event
    }
  };

  useEffect(() => {
    const runHandPoseDetect = async () => {
      const network = await setHandsDetector();
      console.log("HandPose model Loaded"); // To-Do : 삭제 예정, 추후 loaddingSpinner의 위치
      setNeuralNet(network);
    };

    runHandPoseDetect();
  }, []);

  useInterval(() => {
    if (neuralNet) {
      detect(neuralNet);
    }
  }, 10);

  return (
    <MainPageContainer>
      <WebCamera ref={webcamRef} />
      <Canvas ref={canvasRef} />
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
