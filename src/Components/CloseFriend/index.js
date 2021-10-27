import "./index.css";

const CloseFriendComponent  = (props) => {
    const user = props.user;
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;
    const userProfilePicture = user.userProfilePicture;
    return(
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PUBLIC_FILES+`${userProfilePicture}`} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
};

export default CloseFriendComponent;