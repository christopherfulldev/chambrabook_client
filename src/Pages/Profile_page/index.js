import "./index.css";

import AlbumComponent from "../../Components/Album";
import LeftSideBarComponent from "../../Components/LeftSideBar";
import TopBarComponent from '../../Components/TopBar/index';
import ProfilePicUploaderComponent from "../../Components/ProfilePicUploader";

import {Button} from "react-bootstrap";

import APIconect from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import {Redirect} from "react-router-dom";
import { useEffect, useState, useContext} from "react";

const ProfilePage = (props) => {
    const [user, setUser] = useContext(AuthContext);
    const [payload, setPayload] = useState({});
    const {useToken} = props;
    const {token} = useToken();

    useEffect(async () => {
        const payloadData = JSON.parse(localStorage.getItem("payload"));
        const pickedPayload = await APIconect.getProfilePayload({...payloadData, token});
        setPayload(pickedPayload.data);
        setUser(pickedPayload);
    }, []);

    const logout = (event) => {
        localStorage.removeItem("token");
        localStorage.removeItem("payload");
        props.history.push("/");
    }

    if(!token) {
        return <Redirect to="/"/>
    }
    return (
        <>
            <TopBarComponent payload={payload}/>
            <div className="profile">
            <LeftSideBarComponent/>
            {token && <Button onClick={logout}>Log Out</Button>}
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
                    
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{payload.name} {payload.lastName}</h4>
                        <p>{payload.age}</p>
                        <span className="profileInfoDesc">{payload.refBox}</span>
                    </div>
                    <AlbumComponent className="album" photos={payload.photos} setPayload={setPayload}/>
                </div>
            </div>
        </div>  
      </>
    );
};

export default ProfilePage;