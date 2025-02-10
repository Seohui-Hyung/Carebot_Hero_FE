import "./App.css";

import { useEffect, useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProgressContext } from "./store/userProgressStore.jsx";
import { HomeStatusContext } from "./store/homeStatusStore.jsx";
import { HealthContext } from "./store/healthStore.jsx";
import { CalendarStoreContext } from "./store/calendarStore.jsx";

import TopNav from "./components/nav/TopNav";
import SideNav from "./components/nav/SideNav";
import LoadingSpinner from "./components/spinner/LoadingSpinner.jsx";

import Home from "./components/main/home/Home.jsx";
import Notification from "./components/main/notification/Notification.jsx";
import Message from "./components/main/message/Message.jsx";
import Emergency from "./components/main/emergency/Emergency.jsx";
import Calendar from "./components/main/calendar/Calendar.jsx";
import Activity from "./components/main/activity/Activity.jsx";
import Mental from "./components/main/mental/Mental.jsx";

import Accounts from "./components/main/accounts/Accounts.jsx";
import Settings from "./components/main/settings/Settings.jsx";
// import Router from "./router/router";

import Advertisement from "./components/main/advertisement/Advertisement.jsx";

function App() {
  const userProgressStore = useContext(UserProgressContext);
  const homeStatusStore = useContext(HomeStatusContext);
  const healthStore = useContext(HealthContext);
  const calendarStore = useContext(CalendarStoreContext);

  const loading =
    userProgressStore.loading || homeStatusStore.loading || healthStore.loading;

  return (
    <BrowserRouter>
      {loading && <LoadingSpinner />}
      {userProgressStore.loginUserInfo.login ? (
        <div id="app">
          <nav id="top-nav">
            <TopNav />
          </nav>
          <nav id="side-nav">
            <SideNav />
          </nav>

          <main id="main-page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/message" element={<Message />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/mental" element={<Mental />} />
              <Route path="/accounts/*" element={<Accounts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div id="app">
          <Advertisement />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
