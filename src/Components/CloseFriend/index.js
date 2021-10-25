import "./index.css";

const CloseFriendComponent  = () => {
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;
    const userProfilePicture = user.userProfilePicture;
    return(
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PUBLIC_FILE+`${userProfilePicture}`} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
};

export default CloseFriendComponent;