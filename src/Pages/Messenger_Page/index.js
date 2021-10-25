import "./index.css";

import TopBarComponent from "../../Components/TopBar";
import ConversationComponent from "../../Components/Conversation";
import MessageComponent from "../../Message";
import ChatOn from "../../Components/ChatOn";

import APIconnection from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import { useState, useEffect, useContext} from "react";

import {io} from "socket.io-client";

const MessengerPage = () => {
    const socketConfiguration = require("../../utils/socket.io.config");
    const socketEmitConfiguration = require("../../utils/socket.io.config");
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(async ()=> {
        socketConfiguration();
    }, []);

    useEffect( async () => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage, currentChat]);

    useEffect( async () => {
        socketEmitConfiguration();
    }, [user]);

    useEffect(async () => {
        try {
            await APIconnection.getConversations();
            return setConversations(response.data);
        } catch (error) {
            throw new Error("Error while recovery messages, try again");
        };
    }, [currentChat]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };
        const receverId = currentChat.members.find((member) => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            await APIconnection.sendMessages();
            setMessages([...message, response.data]);
            setNewMessage("");
        } catch (error) {
            throw new Error("Error while send message, trya again");
        };
    }

    useEffect( async () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return(
        <>
        <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput" />
                    {conversations.map((conversation) => (
                    <div onClick={() => setCurrentChat(c)}>
                        <Conversation conversation={conversation} currentUser={user} />
                    </div>
                    ))}
                </div>
                </div>
                <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                    <>
                        <div className="chatBoxTop">
                        {messages.map((message) => (
                            <div ref={scrollRef}>
                            <Message message={message} own={message.sender === user._id} />
                            </div>
                        ))}
                        </div>
                        <div className="chatBoxBottom">
                        <textarea
                            className="chatMessageInput"
                            placeholder="write something..."
                            onChange={(event) => setNewMessage(event.target.value)}
                            value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>
                            Send
                        </button>
                        </div>
                    </>
                    ) : (
                    <span className="noConversationText">
                        Open a conversation to start a chat.
                    </span>
                    )}
                </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                            <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default MessengerPage;


