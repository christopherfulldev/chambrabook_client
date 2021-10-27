import "./index.css";

import OnLineModeComponent from "../OnLineMode";

import {AuthContext} from "../../Context/Auth.Context";
import {Users} from "../../dummyData";
import APIconnection from "../../Services/APIconect";

import { useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";

import {Add, Remove} from "@mui/icons-material";

const RightSideBarComponent = () => {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useContext(AuthContext);
    const [followed, setFollowed] = useState([]);

    useEffect(() => {
        try {
            const data = async () => {await APIconnection.getFriends()};
            // const friendList = data.friendList;
            // return setFriends(friendList.data);
        } catch (error) {
            throw new Error("Error while find friend, try again");
        };
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
            await APIconnection.unFollowingsUploadData();
            return setUser({type: "UNFOLLOW", payload: user._id});
            } else {
                await APIconnection.followingsUploadData();
                return setUser({type: "FOLLOW", payload: user._id});
            }
            setFollowed(!followed);
        } catch (error) {
            throw new Error("Error while follow/unfollow, try again");
        }
    }

    const HomeRightbar = () => {
        return (
          <>
            <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                    <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
                </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                {Users.map((user) => (
                    <OnLineModeComponent key={user.id} user={user} />
                ))}
            </ul>
          </>
        );
      };
    
    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== user.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                </button>
                )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
              
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
              
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">
                    {user.relationship === 1
                        ? "Single"
                        : user.relationship === 1
                        ? "Married"
                        : "-"}
                    </span>
                </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                {friends.map((friend) => (
                    <Link
                    to={"/profile/" + friend.username}
                    style={{ textDecoration: "none" }}
                    >
                    <div className="rightbarFollowing">
                        <img
                        src={
                            friend.profilePhoto
                        }
                        alt=""
                        className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                    </Link>
                ))}
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
          <div className="rightbarWrapper">
            {user ? <ProfileRightbar /> : <HomeRightbar />}
          </div>
        </div>
    );
};



export default RightSideBarComponent;