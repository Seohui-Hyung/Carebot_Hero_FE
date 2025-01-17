import "./Calendar.css";

import CalendarStoreContextProvider from "../../../store/calendarStore";

import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import SelectedDate from "./SelectedDate";

export default function Calendar() {
  return (
    <CalendarStoreContextProvider>
      <div id="calendar">
        <CalendarHeader />
        <CalendarBody />
        <SelectedDate />
      </div>
    </CalendarStoreContextProvider>
  );
}
