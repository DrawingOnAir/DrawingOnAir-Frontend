import React, { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import setHandsDetector from "../utils/TensorflowUtils/setHandsDetector";
import detectHands from "../utils/TensorflowUtils/detectHands";
import useInterval from "../hooks/useInterval";
import LineBar from "../components/LineBar";
import ColorBar from "../components/ColorBar";
import CompositingBar from "../components/CompositingBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { getMainTag } from "../features/getMainDataReducer";
import HANDS_ID from "../config/handsId";

function MainPage() {
  const dispatch = useDispatch();

  const [contextArray, setContextArray] = useState([]);
  const [neuralNet, setNeuralNet] = useState(null);
  const [webCam, setWebCam] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const canvasRefs = useRef([]);
  const webcamRef = useRef(null);
  const mainRef = useRef(null);

  const compositingType = useSelector((state) => state.compositingData);
  const canvasColor = useSelector((state) => state.selectingColor);
  const canvasLineThickness = useSelector(
    (state) => state.selectingLineThickness,
  );

  useEffect(() => {
    dispatch(getMainTag(mainRef));
  }, [dispatch]);

  const setCanvasAndWebCam = () => {
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

      const canvasArray = canvasRefs.current.map((canvasRef) => {
        canvasRef.width = videoWidth;
        canvasRef.height = videoHeight;

        return canvasRef.getContext("2d");
      });

      setCanvasWidth(videoWidth);
      setCanvasHeight(videoHeight);
      setWebCam(video);
      setContextArray(canvasArray);
    }
  };

  useEffect(() => {
    const runHandPoseDetect = async () => {
      try {
        const network = await setHandsDetector();

        setNeuralNet(network);
      } catch (error) {
        throw new Error(
          "Hand-pose-detection ????????? ??????????????? ????????? ?????? ???????????????.",
        );
      }
    };

    runHandPoseDetect();
  }, []);

  useInterval(() => {
    if (contextArray.length === 0) {
      setCanvasAndWebCam();
    }

    if (neuralNet) {
      detectHands(
        neuralNet,
        webCam,
        setIsLoading,
        contextArray,
        canvasWidth,
        canvasHeight,
        compositingType,
        canvasColor,
        canvasLineThickness,
      );
    }
  }, 100);

  return (
    <MainPageContainer ref={mainRef}>
      {isLoading ? (
        <>
          <LoadingSpinner />
          <CheckingContainer>
            <WebCamera ref={webcamRef} />
          </CheckingContainer>
        </>
      ) : (
        <>
          <WebCamera ref={webcamRef} />
          {HANDS_ID.map((hand, index) => {
            return (
              <Canvas
                key={hand.id}
                id={hand.id}
                ref={(element) => {
                  canvasRefs.current[index] = element;
                }}
              />
            );
          })}
          <CompositingBar />
          <LineBar />
          <ColorBar />
        </>
      )}
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CheckingContainer = styled.div`
  position: relative;
  width: 0%;
  height: 0%;
`;

const WebCamera = styled(WebCam)`
  position: absolute;
  width: 100vw;
  height: 100%;
  left: 0%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

const Canvas = styled.canvas`
  position: absolute;
  width: 100vw;
  height: 100%;
  left: 0%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

export default MainPage;
