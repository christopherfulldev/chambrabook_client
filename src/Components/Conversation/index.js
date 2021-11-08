import "./index.css";

import { useState, useEffect} from "react";

const CoonversationComponent = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null);
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(async () => {
        const friendId = conversation.members.find((member) => member !== currentUser._id)
        try {
            await APIconnection.getConversationsBetweenUsers();
            return setUser(response.data);
        } catch (error) {
            throw new Error("Error, Try again");
        }
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                user?.profilePicture
                    ? PUBLIC_FILES + user.profilePicture
                    : PUBLIC_FILES + "person/noAvatar.png"
                }
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
};

export default ConversationComponent;