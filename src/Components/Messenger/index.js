import "./index.css";

import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

import APIconnection from "../../Services/APIconect";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { io } from "socket.io-client";
import { traverseTwoPhase } from "react-dom/cjs/react-dom-test-utils.production.min";

const MessengerComponent = (props) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };
    };

    const receiverId = currentChat.members.find((member) => member !== user._id);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)
        && setMessages((prev) => [...prev, currentChat])
    }, [arrivalMessage, currentChat] );

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(user.followings.filter((filter) => {
                users.some((unique) => unique.userId === filter)}));
        });
    }, [user]);

    useEffect( async ()=> {
        await APIconnection.getMessages();
        setMessages(response.data);
    }, [currentChat]);

    socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage
    })

    const sendMessageConnection  =  async ()  => {
        await APIconnection.sendMessages();
        try {
            setMessages([...messages, response.data]);
            setNewMessage("");
        } catch (error) {
            throw new Error("Error while send message, try again");
        };
    };

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput" />
                    
                    {conversations.map((conversation) => (
                        <div onClick={(event) => setCurrentChat(conversation)}>
                            <Conversation conversation={conversation} currentUser={user} />
                        </div>
                        ))
                    }

                </div>
            </div>
           
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                    <>
                        <div className="chatBoxTop">
                        
                        {messages.map((message) => (
                            <div ref={scrollRef}>
                                <Message message={message} messageData={message.sender === user._id} />
                            </div>
                            ))
                        }
                        
                        </div>

                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            />
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
    );
};

