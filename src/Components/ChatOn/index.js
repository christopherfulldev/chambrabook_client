import "./index.css";

import APIconnection from "../../Services/APIconect";
import {useEffect, useState} from "react";

const ChatOnComponent = (onlineUsers, curren) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(async () => {
      try {
        await APIconnection.getFriends();
        setFriends(response.data);
      } catch (error) {
        throw new Error("Error, try again");
      };
    }, [currentId]);

    useEffect(() => {
      setOnlineFriends(friends.filter((filter) => onlineUsers.includes(filter._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
      try {
        await APIconnection.getConversations()
        return setCurrentChat(response.data)
      } catch (error) {
        throw new Error("Error, try again");
      }
    };

    return(
        <div className="chatOnline">
        {onlineFriends.map((onlineFriends) => (
          <div className="chatOnlineFriend" onClick={() => handleClick(onlineFriends)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  onlineFriends?.profilePicture
                    ? PUBLIC_FILES + onlineFriends.profilePicture
                    : PUBLIC_FILES + "person/noAvatar.png"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{onlineFriends?.username}</span>
          </div>
        ))}
      </div>
    )
};

export default ChatOnComponent;