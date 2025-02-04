import "./Accounts.css";

import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserProgressContext } from "../../../store/userProgressStore.jsx";

import Modal from "../../modal/Modal.jsx";

export default function CreateFamily() {
  const userProgressStore = useContext(UserProgressContext);
  const navigate = useNavigate();

  const [familyIdChecked, setFamilyIdChecked] = useState(false);
  const [nameIsInvalid, setNameIsInvalid] = useState(false);

  const inputFamilyId = useRef("");
  const inputName = useRef("");

  // 가족 구성원 조회 및 정보 저장
  async function handleCheckFamily() {
    const familyId = inputFamilyId.current.value;

    try {
      const response = await fetch(
        `${userProgressStore.DEV_API_URL}/families/${familyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();

      if (response.ok) {
        if (resData.message === "Family retrieved successfully") {
          console.log("가족 구성원 조회 성공");

          // 검색된 가족 모임 이름 저장
          setFamilyIdChecked(resData.result);

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

  async function handleCreateMember(event) {
    event.preventDefault();

    if (!familyIdChecked) {
      alert("가족 모임 ID를 확인해주세요.");
      return;
    }

    // 가족 이름 유효성 검사
    const invalid = inputName.current.value.length < 2;
    if (invalid) {
      setNameIsInvalid(true);
      return;
    } else {
      setNameIsInvalid(false);
    }

    // 입력받은 데이터 객체화
    const payload = {
      familyId: inputFamilyId.current.value,
      nickname: inputName.current.value,
    };

    try {
      const result = await userProgressStore.handleCreateMember(payload);
      if (result.success === true) {
        // 가족 모임 등록 성공
        alert("가족 모임 등록 성공");
        userProgressStore.handleCloseModal();

        inputFamilyId.current.value = "";
        inputName.current.value = "";
        setFamilyIdChecked(false);

        navigate("/accounts");
      } else {
        console.error("가족 모임 등록 실패:", result.error);
        alert(
          `에러 발생: ${result.error.type}\n상세 메시지: ${result.error.message}`
        );
      }
    } catch (error) {
      console.error("요청 처리 중 오류 발생:", error);
      alert("요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <Modal
      open={userProgressStore.modalProgress === "create-member-user-info"}
      onClose={
        userProgressStore.modalProgress === "create-member-user-info"
          ? userProgressStore.handleCloseModal
          : null
      }
    >
      <div id="signup-form">
        <div className="signup-header">
          <h2>가족 모임 연결</h2>
          <button type="button" onClick={userProgressStore.handleCloseModal}>
            X
          </button>
        </div>
        <div className="signup-control">
          <label htmlFor="email">가족 모임 ID</label>
          <div className="signup-wrapper">
            <input
              id="email"
              className="email-input"
              type="text"
              name="email"
              ref={inputFamilyId}
              required
            />
            {!familyIdChecked && (
              <button
                type="button"
                onClick={handleCheckFamily}
                className="email-check"
              >
                모임 확인
              </button>
            )}
          </div>
        </div>
        {familyIdChecked && (
          <div className="signup-control-confirm">
            <p>검색된 모임 이름: {familyIdChecked.family_name}</p>
          </div>
        )}
        <p className="signup-control">
          <label htmlFor="text">닉네임</label>
          <input type="text" ref={inputName} />
          {nameIsInvalid && (
            <div className="signup-control-error">
              <p>닉네임은 2글자 이상이어야 합니다.</p>
            </div>
          )}
          <button className="signup-btn" onClick={handleCreateMember}>
            모임 생성
          </button>
        </p>
      </div>
    </Modal>
  );
}
