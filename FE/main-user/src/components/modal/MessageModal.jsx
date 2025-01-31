import "./Modal.css";
import Chatting from "../message/Chatting";

export default function MessageModal({ title, onCloseConfirm }) {
  return (
    <div id="modal-body">
      <div id="modal-bar">
        <h2>{title}</h2>
      </div>
      <div id="chatting-area">
        <Chatting />
      </div>
      <button onClick={onCloseConfirm} className="button">
         닫기
      </button>
    </div>
  );
}