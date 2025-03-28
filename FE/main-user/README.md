## AI 실버 케어 로봇 영웅이
# 독거 노인 페이지 (주 사용자 페이지)

### 개요

Carebot Project는 독거노인을 위한 스마트 생활 도우미 서비스입니다. 이 서비스는 단순한 대화 상대를 넘어, 일상 속에서 동반자가 되어주고, 긴급한 상황에서는 신속한 도움을 제공하는 역할을 합니다.

또한, Carebot은 가족 및 요양보호사가 독거노인의 생활 상태를 원격으로 모니터링할 수 있도록 지원합니다. 대화 내역을 바탕으로 감정 및 심리 상태를 분석하고, 환경 및 활동 데이터를 수집하여 위험 요소를 감지함으로써 보다 안전한 생활을 돕습니다.


### 기술

| **분야** | **사용한 기술** |
| --- | --- |
| Program Language | **Javascript** |
| Language Engine | **Node.js** 22.13.1 - Alpine |
| Web SPA Library | **React** 18.3.18 |
| Bundling Tool | **Vite** 6.0.5 |
| Code Analysis Tool | **ESLint** 9.17.0 |

## 메인 페이지 관련

- 노년층을 대상으로 한 직관적이고 간결한 디자인

- 로봇 디스플레이 탑재용으로 마우스 포인터를 모두 제거한 UI

- 라즈베리파이와 연동된 Firefox 기반 터치 스크린 환경에 맞도록 터치 및 드래그 스크롤 형태로 화면을 구현함
    
    ![메인_화면](https://github.com/user-attachments/assets/1c9d9dab-4178-425b-a7c5-06e726130f44)
  

## 로그인/로그아웃 관련

- 기본적인 로그인, 로그아웃 기능

- 사용자(독거노인) 특성상, 실수로 로그아웃되는 경우를 방지하기 위해 로그아웃을 이스터에그 형태로 사용자 이름 부분에 숨겨둠
    
    ![로그인_화면](https://github.com/user-attachments/assets/3c9c4ec2-2827-4ee2-87dd-9d3ed3fbff8c)
    : 로그인의 경우 인삿말을 시작으로 부드럽게 화면이 올라가며 로그인 창이 뜸

    ![로그아웃](https://github.com/user-attachments/assets/0b683f54-83f5-4179-8367-24c5dd84641d)
    : 사용자 이름을 더블탭하면 로그아웃됨
    

## 메시지 관련

- 원하는 보호자 또는 가족 구성원과 메시지를 주고 받을 수 있는 기능

- 보호자 또는 가족 구성원이 많아질 경우, 스크롤을 통해 수신자 확인 및 선택 가능

- 날짜별로 그룹화되어 날짜별 메시지 목록 확인 용이

- 타이핑을 통해 전송이 가능하나, 기본적으로는 타이핑을 이용하지 않고, 음성을 통해 메시지를 전송할 수 있도록 구현
    - 음성으로 상대 지정 및 메시지 전송까지 모두 가능

- 사진 저장 후, 배경화면으로 이용 가능
    
    ![메시지1](https://github.com/user-attachments/assets/dc4c68a1-2c2c-448e-bc20-45dcb0a8a42e)

    ![메시지2](https://github.com/user-attachments/assets/902d57ba-81d9-4503-83d3-3e990d74c262)

    ![메시지3](https://github.com/user-attachments/assets/e26ae052-7d9e-4e0d-882d-d14c42e5c108)


## 날씨/날짜/환경 관련

- 회원가입 당시 입력한 위치 정보를 기반으로 해당 지역의 기온과 날씨 아이콘 출력

- 날씨의 경우, 총 8가지의 아이콘으로 날씨가 표시됨

- 환경 정보의 경우, 1분 간격으로 환경 정보를 갱신함

- 미세 먼지 또는 일산화탄소 수치가 높을 경우, 아이콘에 빨간 불이 들어옴
    
    ![정보](https://github.com/user-attachments/assets/50b75236-bb4a-4809-a22e-2f281a164d80)


## 기능 관련

### 기능 ON/OFF
    
- 알림/카메라/주행/마이크 ON/OFF 기능

- 카메라/주행은 라즈베리파이와 연동
        
    ![기능버튼](https://github.com/user-attachments/assets/579e57bb-746b-435d-8c46-ecc7cbc961c4)


## 알림 관련
    
- 알림 종류에 따라 색이 다른 알림 블록 목록이 뜸
    - 긴급 상황/재난 문자/메세지/정보 알림 존재

- 날짜별로 그룹화되어 알림 목록 표시

- 각 알림을 누르면 우측에서 상세 내용 확인 가능

- 읽지 않은 알림이 있을 경우 빨간 동그라미가 알림 아이콘에 표시됨

- 알림을 읽었을 경우, 박스가 흐리게 처리됨
    - 단, 메세지 알림의 경우, 영웅이가 TTS를 통해 읽어야 읽음 처리됨
        
    ![알림](https://github.com/user-attachments/assets/3a852f96-a42e-4f6c-bb48-d8a2e8156da0)
    ![알림2](https://github.com/user-attachments/assets/6377229f-e5a7-478a-82eb-82a6c2919755)
  

## 뉴스 관련

- 총 8가지 카테고리의 뉴스를 확인할 수 있는 화면
    - 경제/엔터/환경/건강/정치/과학/스포츠/기술

        ![뉴스_카테고리](https://github.com/user-attachments/assets/563f2b2c-b467-461a-bba7-04a44d5881a3)

- 이전날의 뉴스 데이터를 불러와 목록 형태로 제시

- 이전 페이지로 돌아갈 수 있는 버튼 포함함

- 원하는 뉴스를 선택하면, iframe을 이용하여 페이지 안에서 해당 페이지를 띄울 수 있도록 구현
    
    ![뉴스](https://github.com/user-attachments/assets/7120d4ec-eb6c-4ab4-b88d-16d813cb3562)
    ![뉴스상세](https://github.com/user-attachments/assets/074431aa-983a-420a-90f9-f2e856be1519)


## 캘린더 관련

- 기본적으로 현재 날짜 표시

- 원하는 날짜 선택시, 보호자 또는 가족이 등록한 스케줄 확인 가능
    
    ![달력](https://github.com/user-attachments/assets/b193b147-5aeb-4c7b-8458-0c9f12227598)
    ![스케줄](https://github.com/user-attachments/assets/65af5525-f922-443d-9743-9ba32c30c1e1)


## 배경화면 설정 관련

- 원하는 배경화면을 선택해 변경 가능

- 보호자 또는 가족이 메세지에 사진을 포함하여 전송하면, 해당 사진을 저장하여 배경화면으로 이용 가능

- 배경화면이 많아질 경우, 스크롤을 통해 배경화면 확인 가능
    
    ![배경화면_변경](https://github.com/user-attachments/assets/7c24de7f-e9be-4320-81ca-5dae4fdb30e3)


## 화재 경보 관련

- 일산화탄소 수치가 1.5를 넘어갈 경우, 화재 경보 알림창이 뜸

- 창을 닫아도 1분 간격으로 일산화탄소 수치를 확인하여 여전히 수치가 높을 경우 지속적으로 알림 전송
    
    ![화재_경보](https://github.com/user-attachments/assets/ae041e97-aadc-48a0-ad19-1875a4b49d75)
