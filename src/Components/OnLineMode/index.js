import "./index.css";

const OnLineModeComponent = (props) => {
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;
    const userProfilePicture = user.profilePicture;
    const user = user.username;
    return(
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={PUBLIC_FILES+`${userProfilePicture}`} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
};

export default OnLineModeComponent;
