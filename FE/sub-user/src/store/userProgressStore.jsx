import { useState, useEffect, createContext } from "react";

import { getEnvironments } from "./environmentsStore.jsx";
import handleCreateFamily from "../components/main/accounts/CreateFamily.jsx";
// import { set } from "date-fns"

export const UserProgressContext = createContext({
  isActiveSideBarElem: "",
  toggleStatus: {},
  sidebarIsOpened: false,
  modalProgress: "",
  loginUserInfo: {
    login: false,
    userInfo: undefined,
  },
  familyInfo: {
    isExist: false,
    familyInfo: undefined,
  },
  DEV_API_URL: "",
  MAIN_API_URL: "",
  DEV_KEY: "",
  MAIN_KEY: "",
  setIsActiveSideBarElem: () => {},
  setToggleStatus: () => {},
  setSidebarIsOpened: () => {},
  setModalProgress: () => {},
  setLoginUserInfo: () => {},
  setFamilyInfo: () => {},
  handleActiveSideBarElem: (identifier) => {},
  handleToggleStatus: (toggle) => {},
  handleSidebarToggle: () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleLogin: (userInfo) => {},
  handleGetUserInfo: (id) => {},
  handleLogout: () => {},
  handleCheckEmail: (email) => {},
  handleSignUp: (payload) => {},
  handleUpdateUserInfo: (payload) => {},
  handleCheckFamilyExist: (userId) => {},
  handleCreateFamily: (payload) => {},
  handleGetFamilyInfo: (familyId) => {},
  handleSignOut: (password) => {},
});

export default function UserProgressContextProvider({ children }) {
  // 사이드 바 메뉴 요소 활성화 관련
  const [isActiveSideBarElem, setIsActiveSideBarElem] = useState("home");

  // 기기 조작 관련
  const [toggleStatus, setToggleStatus] = useState({
    notification: false,
    camera: true,
    microphone: true,
    car: false,
  });

  // 모바일 환경에서 사이드 바 열림 여부 관련
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);

  // 모달 열림 여부 관련
  const [modalProgress, setModalProgress] = useState("");

  // 로그인 정보 관리
  const [loginUserInfo, setLoginUserInfo] = useState({
    login: false,
    userInfo: undefined,
  });

  // 가족 정보 관리
  const [familyInfo, setFamilyInfo] = useState({
    isExist: false,
    familyInfo: undefined,
  });

  // 페이지 로드 시 로그인 상태 확인 후 활성화된 사이드 바 상태 가져오기
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("loginUserInfo");
    const storedActiveSideBarElem = localStorage.getItem("isActiveSideBarElem");

    try {
      if (storedUserInfo) {
        setLoginUserInfo({
          login: true,
          userInfo: JSON.parse(storedUserInfo),
        });
      }
    } catch (error) {
      console.error("Error parsing loginUserInfo from localStorage:", error);
      localStorage.removeItem("loginUserInfo"); // 데이터 손상 시 제거
    }

    try {
      if (storedActiveSideBarElem) {
        setIsActiveSideBarElem(storedActiveSideBarElem);
      }
    } catch (error) {
      console.error(
        "Error parsing isActiveSideBarElem from localStorage:",
        error
      );
      localStorage.removeItem("isActiveSideBarElem"); // 데이터 손상 시 제거
    }
  }, []);

  // ======================================================================
  // env 관련
  let DEV_API_URL = import.meta.env.VITE_DEV_API;
  let MAIN_API_URL = import.meta.env.VITE_MAIN_API;
  let DEV_KEY = import.meta.env.VITE_DEV_KEY;
  let MAIN_KEY = import.meta.env.VITE_MAIN_KEY;

  if (DEV_API_URL === undefined) DEV_API_URL = getEnvironments("DEV_API_URL");
  if (MAIN_API_URL === undefined)
    MAIN_API_URL = getEnvironments("MAIN_API_URL");
  if (DEV_KEY === undefined) DEV_KEY = getEnvironments("DEV_KEY");
  if (MAIN_KEY === undefined) MAIN_KEY = getEnvironments("MAIN_KEY");
  // ======================================================================

  // 사이드 바 요소 활성화
  function handleActiveSideBarElem(identifier) {
    setIsActiveSideBarElem(identifier);
    localStorage.setItem("isActiveSideBarElem", identifier); // 활성화된 요소 저장

    setSidebarIsOpened(false); // 모바일 환경일 경우 사이드 바 닫음
  }

  // 기기 조작 관련 함수
  function handleToggleStatus(toggle) {
    setToggleStatus((prevStatus) => {
      return { ...prevStatus, [toggle]: !prevStatus[toggle] };
    });
  }

  // 모바일 환경에서 사이드 바 열고 닫기
  function handleSidebarToggle() {
    setSidebarIsOpened((prev) => !prev);
  }

  // 모달 열기
  function handleOpenModal(identifier) {
    setModalProgress(identifier);
  }

  // 모달 초기화
  function handleCloseModal() {
    setModalProgress("");
  }

  // 로그인
  function handleLogin(userInfo) {
    setLoginUserInfo({
      login: true,
      userInfo,
    });

    // loginUserInfo가 아직 업데이트되지 않은 상태이므로 userInfo를 직접 저장
    localStorage.setItem("loginUserInfo", JSON.stringify(userInfo));

    // 로그인 시 유저가 main이면 Family 정보 조회
  }

  // 회원 정보 조회 및 로그인 처리
  async function handleGetUserInfo(id) {
    try {
      const response = await fetch(`${DEV_API_URL}/accounts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "Account retrieved successfully") {
          console.log("회원 정보 조회 성공");
          handleLogin({
            id: resData.result.id,
            email: resData.result.email,
            role: resData.result.role,
            user_name: resData.result.user_name,
            birth_date: resData.result.birth_date,
            gender: resData.result.gender,
            address: resData.result.address,
          });
          return { success: true, data: resData };
        }
      } else {
        // 서버에서 반환된 에러 정보 처리
        console.error("에러 유형:", resData.detail.type);
        console.error("에러 메시지:", resData.detail.message);
        return {
          success: false,
          error: {
            type: resData.detail.type,
            message: resData.detail.message,
            input: resData.detail.input,
          },
        };
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error("네트워크 오류 또는 기타 예외:", error);
      return {
        success: false,
        error: {
          type: "network_error",
          message: "네트워크 오류가 발생했습니다.",
        },
      };
    }
  }

  // 로그아웃
  function handleLogout() {
    setLoginUserInfo({
      login: false,
      userInfo: undefined,
    });

    // 로컬 스토리지에서 로그인 정보 삭제
    localStorage.removeItem("loginUserInfo");

    // 사이드바 관리
    setIsActiveSideBarElem("accounts");

    // 기본 경로로 이동
    window.location.href = "/";

    // 모달 초기화
    handleCloseModal();

    // 사이드바 닫기
    setSidebarIsOpened(false);

    // 기기 활성화 요소 초기화
    localStorage.removeItem("isActiveSideBarElem");
  }

  // 이메일 중복 확인
  async function handleCheckEmail(email) {
    ///디버깅
    // console.log("Email value before sending request:", email);
    // console.log("DEV_API_URL:", DEV_API_URL);
    // console.log("import.meta.env.VITE_DEV_API:", import.meta.env.VITE_DEV_API);

    try {
      const response = await fetch(`${DEV_API_URL}/accounts/check-email`, {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        // 이메일 사용 가능
        if (resData.message === "Email is available") {
          console.log("이메일 사용 가능:", email);
          return true;
        }
      } else {
        // 이메일 이미 사용 중
        if (resData.detail?.type === "already exists") {
          console.error("이메일 이미 존재:", resData.detail.input.email);
          return false;
        }
      }
    } catch (error) {
      // 네트워크 오류 등 기타 예외 처리
      console.error("네트워크 오류 또는 기타 예외:", error);
      throw new Error("요청을 처리하는 동안 오류가 발생했습니다.");
    }
    return null; // 처리 결과 없음
  }

  // 회원 가입
  async function handleSignUp(payload) {
    try {
      const response = await fetch(`${DEV_API_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "New account created successfully") {
          console.log("회원 가입 성공", resData.result.id);
          handleGetUserInfo(resData.result.id);
          return { success: true, data: resData };
        }
      } else {
        // 서버에서 반환된 에러 정보 처리
        console.error("에러 유형:", resData.detail.type);
        console.error("에러 메시지:", resData.detail.message);
        return {
          success: false,
          error: {
            type: resData.detail.type,
            message: resData.detail.message,
            input: resData.detail.input,
          },
        };
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error("네트워크 오류 또는 기타 예외:", error);
      return {
        success: false,
        error: {
          type: "network_error",
          message: "네트워크 오류가 발생했습니다.",
        },
      };
    }
  }

  async function handleUpdateUserInfo(payload) {
    try {
      const response = await fetch(
        `${DEV_API_URL}/accounts/${loginUserInfo.userInfo.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "Account updated successfully") {
          console.log("회원 정보 수정 성공");
          handleLogin({
            id: resData.result.id,
            email: resData.result.email,
            role: resData.result.role,
            user_name: resData.result.user_name,
            birth_date: resData.result.birth_date,
            gender: resData.result.gender,
            address: resData.result.address,
          });
          return { success: true, data: resData };
        }
      } else {
        // 서버에서 반환된 에러 정보 처리
        console.error("에러 유형:", resData.detail.type);
        console.error("에러 메시지:", resData.detail.message);
        return {
          success: false,
          error: {
            type: resData.detail.type,
            message: resData.detail.message,
            input: resData.detail.input,
          },
        };
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error("네트워크 오류 또는 기타 예외:", error);
      return {
        success: false,
        error: {
          type: "network_error",
          message: "네트워크 오류가 발생했습니다.",
        },
      };
    }
  }

  async function handleCheckFamilyExist(userId) {
    console.log(userId);
    try {
      const response = await fetch(`${DEV_API_URL}/families/check-exist`, {
        method: "POST",
        body: JSON.stringify({ id: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "Family exists") {
          console.log("가족 존재함");

          // 가족 정보 조회
          const familyId = resData.result.family_id;
          handleGetFamilyInfo(familyId);

          return { success: true, data: resData };
        } else {
          console.log("가족 존재하지 않음");
          return { success: false, data: resData };
        }
      }
    } catch (error) {
      console.error("네트워크 오류 또는 기타 예외:", error);
      throw new Error("요청을 처리하는 동안 오류가 발생했습니다.");
    }
  }

  // 가족 생성
  async function handleCreateFamily(payload) {
    console.log(payload);
    try {
      const response = await fetch(`${DEV_API_URL}/families`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "New family created successfully") {
          console.log("가족 생성 성공");

          // 가족 생성 후 가족 정보 조회
          const familyId = resData.result.id;
          handleGetFamilyInfo(familyId);

          return { success: true, data: resData };
        } else {
          console.error("가족 생성 실패:", resData.detail.message);
          return {
            success: false,
            error: {
              type: resData.detail.type,
              message: resData.detail.message,
            },
          };
        }
      }
    } catch (error) {
      console.error("네트워크 오류 또는 기타 예외:", error);
      throw new Error("요청을 처리하는 동안 오류가 발생했습니다.");
    }
  }

  // 가족 구성원 조회 및 정보 저장
  async function handleGetFamilyInfo(familyId) {
    try {
      const response = await fetch(`${DEV_API_URL}/families/${familyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "Family retrieved successfully") {
          console.log("가족 구성원 조회 성공");

          // 추후 가족 구성원 저장도 같이할 예정
          setFamilyInfo({
            isExist: true,
            familyInfo: resData.result,
          });

          return { success: true, data: resData };
        }
      } else {
        // 서버에서 반환된 에러 정보 처리
        console.error("에러 유형:", resData.detail.type);
        console.error("에러 메시지:", resData.detail.message);
        return {
          success: false,
          error: {
            type: resData.detail.type,
            message: resData.detail.message,
            input: resData.detail.input,
          },
        };
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error("네트워크 오류 또는 기타 예외:", error);
      return {
        success: false,
        error: {
          type: "network_error",
          message: "네트워크 오류가 발생했습니다.",
        },
      };
    }
  }

  // 회원 탈퇴
  async function handleSignOut(password) {
    console.log(password);
    try {
      const response = await fetch(
        `${DEV_API_URL}/accounts/${loginUserInfo.userInfo.id}`,
        {
          method: "DELETE",
          body: JSON.stringify({ password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();

      if (response.ok) {
        // 회원 탈퇴 성공
        if (resData.message === "Account deleted successfully") {
          handleLogout(); // 로그아웃 처리
          return { success: true };
        }
      } else {
        // 잘못된 비밀번호 입력
        if (resData.detail.type === "unauthorized") {
          console.error("잘못된 비밀번호 입력");
        } else if (resData.detail.type === "Password is required") {
          console.error("비밀번호 입력은 필수입니다");
        }
        console.log(resData.detail.message);
        return {
          success: false,
          error: {
            type: resData.detail.type,
            message: resData.detail.message,
          },
        };
      }
    } catch (error) {
      // 네트워크 오류 등 기타 예외 처리
      console.error("네트워크 오류 또는 기타 예외:", error);
      throw new Error("요청을 처리하는 동안 오류가 발생했습니다.");
    }
  }

  const ctxValue = {
    isActiveSideBarElem,
    toggleStatus,
    sidebarIsOpened,
    modalProgress,
    loginUserInfo,
    familyInfo,
    DEV_API_URL,
    MAIN_API_URL,
    DEV_KEY,
    MAIN_KEY,
    setIsActiveSideBarElem,
    setToggleStatus,
    setSidebarIsOpened,
    setModalProgress,
    setLoginUserInfo,
    setFamilyInfo,
    handleActiveSideBarElem,
    handleToggleStatus,
    handleSidebarToggle,
    handleOpenModal,
    handleCloseModal,
    handleLogin,
    handleGetUserInfo,
    handleLogout,
    handleCheckEmail,
    handleSignUp,
    handleUpdateUserInfo,
    handleCheckFamilyExist,
    handleCreateFamily,
    handleGetFamilyInfo,
    handleSignOut,
  };

  return (
    <UserProgressContext.Provider value={ctxValue}>
      {children}
    </UserProgressContext.Provider>
  );
}
