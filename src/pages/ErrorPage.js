import React from "react";

import styled from "styled-components";

import PAGE_COLORS from "../config/pageColors";
import errorImageSrc from "../images/errorEmoji.png";

function ErrorPage() {
  return (
    <ErrorPageContainer>
      <ErrorPageBox>
        <ErrorImage />
        <ErrorPageTitle>404</ErrorPageTitle>
        <ErrorPageSubTitle>Oops! 존재하지 않는 페이지입니다.</ErrorPageSubTitle>
        <ErrorPageContent>
          죄송합니다, 현재 찾으시려는 페이지가 없거나 제거 된 상황으로
          예상됩니다.
          <br />
          URL 주소를 다시 확인해 주세요.
        </ErrorPageContent>
      </ErrorPageBox>
    </ErrorPageContainer>
  );
}

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ErrorPageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 50rem;
  padding-left: 10rem;
  line-height: 1.05;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ErrorImage = styled.div`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 9rem;
  height: 9rem;
  background-image: url(${errorImageSrc});
  background-size: cover;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${PAGE_COLORS.ERROR_BACKGROUND};
    -webkit-transform: scale(2.4);
    -ms-transform: scale(2.4);
    transform: scale(2.4);
    z-index: -1;
  }
`;

const ErrorPageTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 4rem;
  font-weight: 700;
`;

const ErrorPageSubTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 400;
`;

const ErrorPageContent = styled.p`
  color: ${PAGE_COLORS.ERROR_CONTENT};
  font-weight: 400;
`;

export default ErrorPage;
