import "./Nav.css";

import ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom"

import { UserProgressContext } from "../../store/userProgressStore.jsx";
import SideNavElems from "./SideNavElems.jsx";

import homeIcon from "../../assets/icons/home.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import smsIcon from "../../assets/icons/sms.svg";
import notificationIcon from "../../assets/icons/notification.svg";
// import vitalSignIcon from "../../assets/icons/vital_sign.svg"
import mindfulnessIcon from "../../assets/icons/mindfulness.svg";
import sirenIcon from "../../assets/icons/siren.svg";
import runIcon from "../../assets/icons/run.svg";

import accountIcon from "../../assets/icons/account_circle.svg";
import settingIcon from "../../assets/icons/settings.svg";
import catIcon from "../../assets/cat.jpg";

export default function SideNav() {
  const userProgressStore = useContext(UserProgressContext);
  // const navigate = useNavigate()

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 720);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 720);
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 화면 너비가 720px 초과일 때만 렌더링
  if (!isDesktop) return null;

  const loginUserInfo = userProgressStore.loginUserInfo;

  function handleChangeFamilyId(familyId) {
    userProgressStore.handleChangeFamilyId(familyId);
  }

  return ReactDOM.createPortal(
    <aside id="side-bar">
      <div>
        <div id="side-nav-header">
          {loginUserInfo.userInfo.role === "sub" &&
            userProgressStore.memberInfo.registerData && (
              <select
                onChange={(event) => handleChangeFamilyId(event.target.value)}
              >
                {userProgressStore.memberInfo.registerData.map((info) => (
                  <option key={info.family_id} value={info.family_id}>
                    {info.family_name}
                  </option>
                ))}
              </select>
            )}
          {loginUserInfo.userInfo.role === "sub" &&
            !userProgressStore.memberInfo.registerData && <h5>모임 없음</h5>}
          {loginUserInfo.userInfo.role === "main" &&
            userProgressStore.familyInfo.isExist && (
              <h5>{userProgressStore.familyInfo.familyInfo.family_name}</h5>
            )}
          {loginUserInfo.userInfo.role === "main" &&
            !userProgressStore.familyInfo.isExist && <h5>모임 없음</h5>}
        </div>
        <ul className="side-nav-elems">
          <SideNavElems
            imgSrc={homeIcon}
            altSrc="home"
            identifier="HOME"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          />
          <SideNavElems
            imgSrc={notificationIcon}
            altSrc="notification"
            identifier="NOTIFICATION"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          />
          <SideNavElems
            imgSrc={smsIcon}
            altSrc="message"
            identifier="MESSAGE"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          />
          {/* <SideNavElems
            imgSrc={sirenIcon}
            altSrc="emergency"
            identifier="EMERGENCY"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          /> */}
          <SideNavElems
            imgSrc={calendarIcon}
            altSrc="calendar"
            identifier="CALENDAR"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          />
          <SideNavElems
            imgSrc={runIcon}
            altSrc="activity"
            identifier="ACTIVITY"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          />
          {/* <SideNavElems
            imgSrc={vitalSignIcon}
            altSrc="health"
            identifier="HEALTH"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          /> */}
          {/* <SideNavElems
            imgSrc={mindfulnessIcon}
            altSrc="mental"
            identifier="MENTAL"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          /> */}
        </ul>
      </div>
      <div>
        <ul className="side-nav-elems">
          <SideNavElems
            imgSrc={accountIcon}
            altSrc="accounts"
            identifier="ACCOUNTS"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          />
          {/* <SideNavElems
            imgSrc={settingIcon}
            altSrc="settings"
            identifier="SETTINGS"
            activeIdentifier={userProgressStore.isActiveSideBarElem}
            onClickElem={userProgressStore.handleActiveSideBarElem}
          /> */}
        </ul>
      </div>
    </aside>,
    document.getElementById("side-nav")
  );
}
