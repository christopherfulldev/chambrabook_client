import "./index.css";

import AlbumComponent from "../../Components/Album";
import APIconect from "../../Services/APIconect";

import {Redirect} from "react-router-dom";
import { useEffect, useState } from "react";

const ProfilePage = (props) => {
    const [payload, setPayload] = useState([]);
    const {useToken} = props;
    const {token} = useToken();
    const {name, userName, age, profilePhoto, email} = payload;
    

    useEffect( async (props) => {
        const payloadData = JSON.parse(localStorage.getItem("payload"));
        const pickedPayload = await APIconect.getProfilePayload({...payloadData, token});
        setPayload(pickedPayload.data);
    }, [payload]);

    if(!token) {
        return <Redirect to="/"/>
    }

    return (
        <>
            <Topbar />
            <div className="profile">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                <div className="profileCover">
                    <img
                    className="profileCoverImg"
                    src={
                        user.coverPicture
                        ? PUBLIC_FILES + user.coverPicture
                        : PUBLIC_FILES + "person/noCover.png"
                    }
                    alt=""
                    />
                    <img
                    className="profileUserImg"
                    src={
                        user.profilePicture
                        ? PUBLIC_FILES + user.profilePicture
                        : PUBLIC_FILES + "person/noAvatar.png"
                    }
                    alt=""
                    />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.refBox}</span>
                </div>
                </div>
                <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar user={user} />
                </div>
            </div>
        </div>  
      </>
    );
};

export default ProfilePage;