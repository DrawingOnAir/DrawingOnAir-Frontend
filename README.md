# ☝️ **AirDrawing**
<img width="477" alt="에어드로잉 (1)" src="https://user-images.githubusercontent.com/76609548/204028372-466d4574-2041-4256-ae44-8789e7e50eee.png">

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=Redux&logoColor=black"> <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=black"> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=black">


`#AirDraing`  `#이제는 종이가 아닌 공중에`  `#당신의 그림을` 


 **AirDrawing** 내 손짓이 그림이 되는 세상
 
세상에는 다양한 방식으로 그림을 그릴 수 있습니다. 펜을 이용하여, 크레파스를 이용하여, 마우스를 이용하여, 코드를 이용하여 등등 다양한 방법이 존재하죠. AirDraing은 당신에게 손짓으로 그림을 그릴 수 있는 서비스를 제공합니다.

# 𝌞 CONTENTS
- [☝️ AIRDRAWING](#-AirDrawing)
- [🔥 CHALLENGES](#-CHALLENGES)
- [💬 INTRODUCTION](#-introduction)
- [🌐 Links](#-links)
- [🎥 Preview](#-preview)
- [✌️ FEATURE](#-feature)
- [🌐 TECH STACKS](#-tech-stacks)
- [📀 EXECUTE](#-execute)

# 🔥CHALLENGES
### 프로젝트 핵심 챌린지

<details><summary>손 동작으로 그림을 그릴 수 가 있는가?</summary></br>
손 동작만으로 그림을 그리기 위해서 생각해야 했던 결과는 총 두가지 방향이 존재했다.
</br> 첫번째는 그림을 그리는 기능을 어떻게 할 것인가?
</br> 두번쨰는 손 동작을 어떻게 인식할 것인가?
</br> 사실 첫번째 기능은 `<cavnas>` 태그를 활용하여 해결하면 됐기 때문에 큰 문제가 어렵지 않았다.
</br> 핵심은 두번째 손 동작에 대한 인식이다. 손 동작을 인식 하기 위해서는 웹카메라에서 특정 손을 인식해 주는 기술이 필요하게 되었고 이를 위해서 필요한 기술이 바로 딥러닝 기술이다.
</br> 딥러닝 기술이라 하면 보통 `Python`에 특화가 되어 있지만 이번에 `Javascript` 로 프로젝트를 함에 있어서 어떤 딥러닝 기술을 사용하면 좋을지 조사해본 결과 `TensorFlow.js`라는 프레임워크를 사용하게 되었다.
</br> `TensorFlow.js`는 자바스크립트 기반으로 구성되어 있고 별도의 라이브러리에 대한 설치 없이 바로 사용이 가능하고, GPU(Ground Power Unit === 컴퓨터 그래픽 처리 장치)를 사용하여 브라우저에서 빠른 속도로 연산이 가능 한다는 점에 있어서 사용 기술로서 체택하게 되었다.
</br> 결과적으로 `TensorFlow.js/models/hand-pose-detecion` 모델을 사용하여 손에 대한 인식을 가능하게 하고 앞선 모델의 인식 결과에서 손의 점에 대한 위치가 `{ ..., keypoints: [{ ..., { x: 100, y: 105, name: "index_finger_tip" }]}` 를 통해 손톱이 있는 검지의 좌표를 해당 좌표를 통해 그림을 기를 수 있게 되었다.
</details>
</br>

<details><summary>도형 병합 기능에 대한 작업이 가능 한가?</summary></br>도형 병합 기능에 대한 작업이 가능한가에 대한 작업을 진행하기 위해서 조사를 진행해본 결과 `canvas` 태그에는 `globalCompositeOperation`이라는 property 속성이 존재하는 것을 알고 있었습니다.
</br> 프로젝트 초반에 코드를 작성할 당시 정말 단순하게 임의로 `globalCompositeOperation = "xor"`로 형성해보고 그림 그리는 작업을 진행을 해본 결과 도형 병합에 대한 교차가 원하는 방식으로 이루어지지 않고 전체 그림이 초기화 되는 결과를 보게 되었습니다.
</br> 원인에 대한 파악 결과 도형 병합에 대한 기능은 `canvas`내 `path`가 닫힌 경로일 때 정상적으로 작동하는 것이 문제였습다.
</br> 손동작으로 실시간으로 그림을 그리는 것은 `canvas.lineTo(x, y)`에 대한 좌표가 계속 그어지면서 도형이 닫힌 파악 시점이 끝난 결과 하나의 도형이 완성되는 것으로 진행이 되는데 이에 따라 선을 그리는 것에 있어서 한 도형과 일치하는 지점을 만날 때 도형 병합 기능을 실시간적으로 실행하는 것은 불가능 하다고 결론을 내리게 되었고 도형이 완전히 그려진 후 병합 기능을 진행하는 것으로 결론을 내렸습니다.
</br></br>
두번째는 영역 지정의 필요성입니다.
</br> 사용자의 입장에서 도형의 병합을 할 때 전체 도형에 대한 병합을 원하지 않는다. 아마 특정 영역에 있는 도형 병합에 대한 영역의 설정을 필요로 할 것 이다
</br> 이를 해결하기 위해서 필요한 것이 바로 사용자가 선택할 영역과, 영역안에 있는 도형들을 구하는 것이 핵심이 된다.
</br> 첫번쨰 영역지점에 있어서는 새로운 캔버스 태그 내에 드래그 모션을 인식하면 영역을 그릴 수 있도록 하였다. 새로운 캔버스 태그를 생성한 이유는 
기존 캔버스 태그 안에서 그림을 그리게 되면 드래그 영역에 대한 잔상이 남기 때문에 이를 해결하기 위해서 새로운 캔버스 태그에 그리고 그린 영역에 대한 좌표값만 변수로 다루었다.
</br> 두번쨰 도형들을 구하기 위해서 도형들에 대한 데이터들을 배열로 저장하는 것이 중요한 작업이 되었습니다. `canvas`태그 관련에서 캔버스 안에 존재하는 그림을 확인할 수 있는 다른 property 속성이 존재하지 않았기에 이미 다 그려진 그림들을 다룰 수 가 없었습니다.
</br> 이를 위해서 그림을 그리는 작업과 동시에 그림을 그릴 때 필요한 데이터들을 전부 `순서`가 강조되는 `배열`안에 추가를 하는 방식을 취하였고 앞서서 구한 데이터의 영역에 맞는 조건과 일치하는 도형들에 대해서만 병합 기능을 해결하는 방안으로 이를 해결하게 되었습니다.
</details>
</br>
<details><summary> 두 개의 손이 각각 다르게 그림 작업의 진행이 가능 한가?</summary>
가능은 하다. `단 하나의 캔버스가 아닌 다른 캔버스에서`.
</br> 이 작업을 이해하기 쉽게 설명하기 위해서는 두개의 마우스가 하나의 컴퓨터 안에서 정상적으로 작동할 것인가? 에 대로 이해하면 더 좋을 것 같다.
이 작업 또한 위와 같은 맥락과 같다. 그림판 내에서 두 손이 같은 모션을 취해도 다른 그림이 그려지는 게 가능 한 것인가? 를 해결하는게 핵심이 되었다.
</br> 이를 해결하기 위해서 본인은 캔버스를 여러개 만들고 결과 그림판을 Origin Canvas안에 다시 그리는 방안으로 해결을 했다.
</br> hand-pose-detection 모델의 결과는 왼손, 오른손 까지 구분을 해주기 때문에 왼손, 오른손에 따라 다른 캔버스를 설정해 주었고 두번째 챌린지에서 그림 데이터들을 배열로 저장한다는 것을 응용하여, 각기 다른 캔버스에서 그리는 행동이 끝났을 때, 하나의 배열안에 데이터들을 다시 추가하고,
</br> 최종적으로 완성된 데이터들을 origin Canvas에 다시 재 그리는 형식을 취함으로서 이를 해결했다.
</br> 이 챌린지에 있어서 아쉬운 부분은 왼손, 오른손 밖에 구분을 못한다는 한계가 많이 아쉽게 느껴졌다.
</br> hand-pose-detction은 손의 감지 수도 지정해줄 수 있는데 받아오는 데이터들에 대해서는 규칙성이 존재하지 않았기에 A라는 오른손, B라는 오른손을 구분해 줄 방법이 없어 canvas를 나누더라도 이를 해결할 수 가 없었다는 문제점이 아쉬웠다.
</br> 즉 예를들어 [A, B] 의 형식으로 지속적으로 결과를 받는게 아닌 [B, A]로 받을 때도 존재하였기에 하나의 캔버스 안에서 A라는 손을 인식하다가 B라는 손을 인식하게 되어 그림이 결과적으로 원하지 않는 그림이 그려지는 상황이 발생하여서 이에 대한 해결을 못한점이 챌린지의 아쉬운 요소로 남게 되었다.
</details>

# 💬 INTRODUCTION
### 프로젝트 기간
#### 2022.11.07 ~ 2022.11.28 : 3주
  - 아이디어 기획, 목업 작성, 칸반 작성, 기술 조사 : 1주
  - 프로젝트 개발, 배포, 테스트 : 2주
### 프로젝트 동기
- 길을 걷다가 혹은 생각을 할 때 손짓으로 허공에 그림을 그려본 기억이 종종 있습니다. 하지만 이런 그림은 지속적으로 남는게 아니라 저의 머릿 속에만 기억에 남게 되죠. 이러한 허공에 그리는 그림을 단순히 머리에만 기억을 하는게 아니라 실제로 기록이 되면 어떨까? 라는 생각을 하게 되면서 이번 기회에 내가 써보지 못했던 딥러닝에 대해서도 학습을 할 수 있을 것 같다라는 생각으로 프로젝트를 시작하게 되었습니다.
### 프로젝트 프로세스
- 아이디어 기획
- 기술 스택 검토
- **[MockUp](https://www.figma.com/file/LixCupDx0TV5VA8b4iKRfi/AirDraw?t=fo1Ma0Gztv1JD7BQ-6)** 설계
- 칸반 작성을 통한 작업 진행

### Git Work Flow
- branch: main & dev
- 기능별로 dev feature branch를 생성하고 코드 작성
- main 브랜치로 병합


# 🌐 Links
### Deploy
- **[airdrawing](https://www.airdrawing.club/)**

### Github Repositories
- **[Frontend Repo](https://github.com/DrawingOnAir)**

# 🎥 Preview
### Airdrawing 영상 링크 입니다.
- **[Airdraing Youtube](https://youtu.be/BFu5W2Pn7_I)**

# ✌️ FEATURE
- 사용자는 손동작을 통해 특정 행동을 취할 수 있습니다. 취할 수 있는 행동은 아래와 같습니다.

    <details><summary>검지만 위로</summary>
    마우스를 드래그 하는 것 처럼 검지를 올린 상태로 그림을 그릴 수 가 있습니다. 만약 처음 그리기 시작한 지점과 맨 마지막에 손이 닿는 지점이 위치한다면 해당하는 선의 색상에 맞게 도형이 생성됩니다.</details>
    <details><summary>검지, 중지만 위로</summary>
    사용자가 선택한 병합 형식을 적용할 범위를 설정해주는 영역을 그립니다. 
    사용자가 영역 선택이 끝나면 사용자가 지정한 병합 형식에 맞게 도형이 병합 됩니다. </details>
    <details><summary>검지, 소지만 위로</summary>
    사용자가 그린 그림을 전부 초기화 할 수 있습니다.</details>
- 사용자는 자신이 그리고 싶은 선에 대한 색상을 선택할 수 있습니다.
- 사용자는 자신이 그리고 싶은 선의 크기를 선택할 수 있습니다.
- 사용자는 도형 들에 대한 병합 형식을 직접 선택 할 수 있습니다.
- 사용자가 그림을 다 그린 후 Caputre 버튼을 클릭 할 경우 사용자의 모습과 그린 그림이 이미지로 저장 되어 다운받아집니다.


|<img width="500px" alt="homepage" src="https://user-images.githubusercontent.com/76609548/204033585-08640766-92a4-4ee0-894a-1dc37d1a0f20.png">|<img width="500px" alt="mainpage" src="https://user-images.githubusercontent.com/76609548/204033727-4d336f49-974e-4baf-a5b3-db63a533215c.png">|
|:---:|:---:|
|홈페이지|메인페이지|


# 🌐 TECH STACKS
### Front-End
- JavaScript ES2015+
- React
- Redux Toolkit
- Styled-Component
- tensorflow.js / Model === hand-pose-detection

### Test
- Jest

### Deployment
- Netlify

# 📀 EXECUTE
### Reauirements
- 최신 버전의 Chrome Browser 사용을 권장합니다.

### Installation
- **Frontend**
  ```
  $ git clone https://github.com/DrawingOnAir/DrawingOnAir-Frontend.git
  $ cd DrawingOnAir-Frontend
  $ npm install --force
  $ npm start
  ```


