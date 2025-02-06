import "./Accounts.css";

import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserProgressContext } from "../../../store/userProgressStore.jsx";

import Modal from "../../modal/Modal.jsx";

export default function UpdateMember() {
  const userProgressStore = useContext(UserProgressContext);
  const navigate = useNavigate();

  const [nameIsInvalid, setNameIsInvalid] = useState(false);

  const inputName = useRef("");

  async function handleUpdateMember(event) {
    event.preventDefault();

    // 닉네임 유효성 검사
    const invalid = inputName.current.value.length < 2;
    if (invalid) {
      setNameIsInvalid(true);
      return;
    } else {
      setNameIsInvalid(false);
    }

    try {
      const result = await userProgressStore.handleUpdateMember(
        inputName.current.value
      );
      if (result.success === true) {
        // 닉네임 수정 성공
        alert("닉네임 수정 성공");
        userProgressStore.handleCloseModal();
        inputName.current.value = "";
        navigate("/accounts");
      } else {
        console.error("닉네임 수정 실패:", result.error);
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
      open={userProgressStore.modalProgress === "update-member-user-info"}
      onClose={
        userProgressStore.modalProgress === "update-member-user-info"
          ? userProgressStore.handleCloseModal
          : null
      }
    >
      <div id="signup-form">
        <div className="signup-header">
          <h2>닉네임 정보 수정</h2>
          <button type="button" onClick={userProgressStore.handleCloseModal}>
            X
          </button>
        </div>
        <p className="signup-control">
          <label htmlFor="text">닉네임</label>
          <input type="text" ref={inputName} />
          {nameIsInvalid && (
            <div className="signup-control-error">
              <p>닉네임은 2글자 이상이어야 합니다.</p>
            </div>
          )}
          <button className="signup-btn" onClick={handleUpdateMember}>
            수정
          </button>
        </p>
      </div>
    </Modal>
  );
}
