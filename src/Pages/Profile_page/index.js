import "./index.css";

import AlbumComponent from "../../Components/Album";
import LeftSideBarComponent from "../../Components/LeftSideBar";
import TopBarComponent from '../../Components/TopBar/index';
import ProfilePicUploaderComponent from "../../Components/ProfilePicUploader";

import APIconect from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import {Redirect} from "react-router-dom";
import { useEffect, useState, useContext} from "react";

const ProfilePage = (props) => {
    const [user, setUser] = useContext(AuthContext);
    const [name, setName] = useContext(AuthContext);
    const [lasName, setLastName] = useContext(AuthContext);
    const [profilePhoto, setProfilePhoto] = useContext(AuthContext);
    const [Photos] = useContext(AuthContext);
    const [payload, setPayload] = useState({});
    const {
        useToken
    } = props;
    const {
        token
    } = useToken();

    useEffect(async () => {
        const payloadData = JSON.parse(localStorage.getItem("payload"));
        const pickedPayload = await APIconect.getProfilePayload({
            ...payloadData,
            token
        });
        setPayload(pickedPayload.data);
        setUser(pickedPayload);
    }, []);

    if (!token) {
        return <Redirect to = "/" / >
    }

    return (
        <>
            <TopBarComponent {...props } payload={payload} useToken={useToken}/>
            <div className="profile">
            <LeftSideBarComponent/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img
                        className="profileCoverImg"
                        src={payload.profilePhoto}
                        alt=""
                        />
                        <img
                        className="profileUserImg"
                        src={payload.profilePhoto}
                        alt=""
                        />
                        <ProfilePicUploaderComponent setPayload={setPayload}/>
                    </div>
                   
                    <AlbumComponent className="album" photos={payload.photos} payload={payload} setPayload={setPayload}/>
                </div>
            </div>
        </div>  
      </>
    );
};

export default ProfilePage;