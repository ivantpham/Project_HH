import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { sendMessageToOpenAI } from "../axios";
import "../assets/less/PageChat.css";

function App() {
    const inputRef = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleMessageSubmit = useCallback(async () => {
        const inputValue = inputRef.current.value;
        const response = await sendMessageToOpenAI(inputValue);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputValue, isUser: true },
            { text: response, isUser: false },
        ]);
        setInput("");
        inputRef.current.value = "";
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleMessageSubmit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const renderedMessages = useMemo(() => (
        messages.map((message, index) => (
            <div
                key={index}
                className={message.isUser ? "user-message" : "bot-message"}
            >
                {message.text}
            </div>
        ))
    ), [messages]);

    return (
        <div className="App">
            <div className="input-container">
                <input
                    type="text"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleMessageSubmit}>Send</button>
            </div>
            <div className="chat">
                {renderedMessages}
            </div>
        </div>
    );
}

export default App;