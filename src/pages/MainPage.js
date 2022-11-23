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
import LoadingSpinner from "../components/LoadingSpinner";
import * as fingerPose from "../Fingerpose";
import { getMainTag } from "../features/getMainDataReducer";
import HANDS_ID from "../config/handsId";

function MainPage() {
  const dispatch = useDispatch();

  const [contextArray, setcontextArray] = useState([]);
  const [neuralNet, setNeuralNet] = useState(null);
  const [webCam, setWebCam] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const canvasRefs = useRef([]);
  const webcamRef = useRef(null);

  const compositingType = useSelector((state) => state.compositingData);
  const canvasColor = useSelector((state) => state.selectingColor);
  const canvasLineThickness = useSelector(
    (state) => state.selectingLineThickness,
  );

  useEffect(() => {
    dispatch(getMainTag(canvasRefs.current[0]));
  }, [dispatch]);

  const detect = async (network, video) => {
    try {
      const hands = await network.estimateHands(video);
      if (hands.length !== 0) {
        setIsLoading(false);
      }

      if (hands.length > 0) {
        const GE = new fingerPose.GestureEstimator([
          fingerPose.Gestures.DrawGesture,
          fingerPose.Gestures.NoneGesture,
          fingerPose.Gestures.DragGesture,
          fingerPose.Gestures.ClearGesture,
          fingerPose.Gestures.ExampleGesture,
        ]);
        hands.forEach((hand) => {
          const gesture = GE.estimate(hand, 8);

          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            const confidence = gesture.gestures.map(
              (prediction) => prediction.score,
            );
            const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence),
            );

            if (hand.handedness === "Right") {
              drawWithHand(
                hand,
                contextArray[0],
                contextArray[1],
                contextArray[2],
                gesture.gestures[maxConfidence].name,
                canvasWidth,
                canvasHeight,
                compositingType,
                canvasColor,
                canvasLineThickness,
                hand.handedness,
              );
            }

            if (hand.handedness === "Left") {
              drawWithHand(
                hand,
                contextArray[0],
                contextArray[3],
                contextArray[4],
                gesture.gestures[maxConfidence].name,
                canvasWidth,
                canvasHeight,
                compositingType,
                canvasColor,
                canvasLineThickness,
                hand.handedness,
              );
            }
          }
        });
      }
    } catch (error) {
      console.error("손 동작 감지에 실패하였습니다.");
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

      const canvasArray = canvasRefs.current.map((canvasRef) => {
        canvasRef.width = videoWidth;
        canvasRef.height = videoHeight;

        return canvasRef.getContext("2d");
      });

      setCanvasWidth(videoWidth);
      setCanvasHeight(videoHeight);
      setWebCam(video);
      setcontextArray(canvasArray);
    }
  };

  useEffect(() => {
    const runHandPoseDetect = async () => {
      try {
        const network = await setHandsDetector();

        setNeuralNet(network);
      } catch (error) {
        console.error(
          "Hand-pose-detection 모델이 정상적으로 적용이 되지 않았습니다.",
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
      detect(neuralNet, webCam);
    }
  }, 100);

  return (
    <MainPageContainer>
      {isLoading ? (
        <>
          <LoadingSpinner />
          <FakeContainer>
            <WebCamera ref={webcamRef} />
          </FakeContainer>
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

const FakeContainer = styled.div`
  position: relative;
  width: 0%;
  height: 0%;
`;

const WebCamera = styled(WebCam)`
  position: absolute;
  width: 100vw;
  height: 100%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

const Canvas = styled.canvas`
  position: absolute;
  width: 100vw;
  height: 100%;
  text-align: center;
  transform: rotateY(180deg);
  z-index: 9999;
`;

export default MainPage;
