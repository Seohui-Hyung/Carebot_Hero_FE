import React from "react";
import { useState, useEffect, useRef } from "react";
import Message from "./Message.jsx";
import ReplyBar from "./ReplyBar.jsx";
import { useMessageStore } from "../../store/messageStore.jsx";
import { useUserProgressStore } from "../../store/userProgressStore.jsx";
import "./Message.css";

export default function Chatting({ isOpen }) {
    const { selectedUser, conversations, addMessage, setConversations } = useMessageStore();
    const { loginUserInfo } = useUserProgressStore();
    const [isListening, setIsListening] = useState(false); // 음성 인식 상태
    const messageEndRef = useRef(null);

    
    // const messages = conversations[selectedUser.user_id] || [];
    
    useEffect(() => {
        if (isOpen && selectedUser.user_id) {
            console.log(`📩 ${selectedUser.user_id}와의 전체 대화 내역 불러오기 시작`);
            fetchMessages(selectedUser.user_id);
        }
        
        return () => {
            console.log("🚪 채팅 창이 닫혔습니다. 메시지 가져오기를 중단합니다.");
        };
    }, [isOpen, selectedUser]);
    
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [conversations[selectedUser.user_id]]);
    
    if (!selectedUser || !conversations  || !conversations[selectedUser.user_id]) return <p>대화할 상대를 선택하세요.</p>;
    
    const handleSendMessage = async (newMessage) => {
        const newMsgObject = {
            index: Date.now(),  // 임시 ID (서버와 동기화되면 변경 가능)
            from_id: loginUserInfo.userInfo.id, // 내가 보낸 메시지
            to_id: selectedUser.user_id,
            created_at: new Date().toISOString(),
            content: newMessage,
            sender: "me"
        };

        // addMessage(selectedUser.user_id, newMsgObject);

        // setConversations((prev) => ({
        //     ...prev,
        //     [selectedUser.user_id]: [...(prev[selectedUser.user_id] || []), newMsgObject]
        // }));

        const response = await sendMessageToServer(newMsgObject);

        if (response.success) {
            console.log("✅ 서버에 메시지 저장 완료:", response.data);
        } else {
        console.error("❌ 메시지 전송 실패:", response.error);
        }

        setIsListening(false); // 메시지 전송 후 음성 인식 종료
    };

    const handleStartListening = () => {
        setIsListening(true);
        // STT (Speech-to-Text) API 호출 로직
    };

    return (
        <div className="message-container">
            <div className="message-header">
                <h2 className="chat-title">{selectedUser.name}</h2>
            </div>
            <div className="message-content">
                <div className="message-list">
                    {(conversations[selectedUser.user_id] && conversations[selectedUser.user_id].length === 0) ? (
                        <p className="no-messages">대화 내역이 없습니다.</p>
                    ) : (
                        conversations[selectedUser.user_id].map((msg) => (
                            <Message 
                                key={msg.index} 
                                text={msg.content} 
                                sender={msg.sender} 
                                time={new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            />
                        ))
                    )}
                    <div ref={messageEndRef} />
                </div>
                <ReplyBar onSend={handleSendMessage} onRetry={handleStartListening} />
            </div>
        </div>
    );
}