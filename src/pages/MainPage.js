import React, { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import setHandsDetector from "../utils/setHandsDetector";
import drawWithHand from "../utils/drawWithHand";
import useInterval from "../hooks/useInterval";
import LineBar from "../components/LineBar";
import ColorBar from "../components/ColorBar";
import CompositingBar from "../components/CompositingBar";
import * as fingerPose from "../Fingerpose";
import { getMainTag } from "../features/getMainDataReducer";

function MainPage() {
  const dispatch = useDispatch();

  const [neuralNet, setNeuralNet] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [newCtx, setNewCtx] = useState(null);
  const [webCam, setWebCam] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [originX, setOriginX] = useState(null);
  const [originY, setOriginY] = useState(null);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const newCanvasRef = useRef(null);

  const compositingType = useSelector((state) => state.compositingData);
  const canvasColor = useSelector((state) => state.selectingColor);
  const canvasLineThickness = useSelector(
    (state) => state.selectingLineThickness,
  );

  useEffect(() => {
    dispatch(getMainTag(canvasRef));
  }, [dispatch]);

  const detect = async (network, video) => {
    const hand = await network.estimateHands(video);

    if (hand.length > 0) {
      const GE = new fingerPose.GestureEstimator([
        fingerPose.Gestures.DrawGesture,
        fingerPose.Gestures.StartGesture,
        fingerPose.Gestures.DragGesture,
        fingerPose.Gestures.ClearGesture,
        fingerPose.Gestures.ExampleGesture,
      ]);
      const gesture = GE.estimate(hand[0], 8);

      if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        const confidence = gesture.gestures.map(
          (prediction) => prediction.score,
        );
        const maxConfidence = confidence.indexOf(
          Math.max.apply(null, confidence),
        );

        if (gesture.gestures[maxConfidence].name === "start") {
          const { x, y } = hand[0].keypoints[8];

          setOriginX(x);
          setOriginY(y);
        }

        drawWithHand(
          hand,
          ctx,
          gesture.gestures[maxConfidence].name,
          canvasWidth,
          canvasHeight,
          originX,
          originY,
          newCtx,
          compositingType,
          canvasColor,
          canvasLineThickness,
        );
      }
    }
  };

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

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      newCanvasRef.current.width = videoWidth;
      newCanvasRef.current.height = videoHeight;

      const context = canvasRef.current.getContext("2d");
      const newContext = newCanvasRef.current.getContext("2d");

      setCanvasWidth(videoWidth);
      setCanvasHeight(videoHeight);
      setWebCam(video);
      setNewCtx(newContext);
      setCtx(context);
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
    if (!ctx) {
      setCanvasAndWebCam();
    }

    if (neuralNet) {
      detect(neuralNet, webCam);
    }
  }, 100);

  return (
    <MainPageContainer>
      <WebCamera ref={webcamRef} />
      <Canvas ref={canvasRef} />
      <NewCanvas ref={newCanvasRef} />
      <CompositingBar />
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
  bottom: 0%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

const NewCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

export default MainPage;
