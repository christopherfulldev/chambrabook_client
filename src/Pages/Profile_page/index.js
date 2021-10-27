import "./index.css";

import FeedComponent from "../../Components/Feed";
import RightSideBarComponent from "../../Components/RightSideBar";
import LeftSideBarComponent from "../../Components/LeftSideBar";
import TopBarComponent from '../../Components/TopBar/index';

import APIconect from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import {Redirect} from "react-router-dom";
import { useEffect, useState, useContext} from "react";

const ProfilePage = (props) => {
    const [user, setUser] = useContext(AuthContext);
    const [payload, setPayload] = useState([]);
    const {useToken} = props;
    const {token} = useToken();

    useEffect(async () => {
        const payloadData = JSON.parse(localStorage.getItem("payload"));
        const pickedPayload = await APIconect.getProfilePayload({...payloadData, token});
        setPayload(pickedPayload.data);
        setUser(pickedPayload);
        console.log(pickedPayload);
    }, []);

    if(!token) {
        return <Redirect to="/"/>
    }

    return (
        <>
            <TopBarComponent/>
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
                    </div>
                    
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{payload.userName}</h4>
                        <span className="profileInfoDesc">{payload.refBox}</span>
                    </div>
                </div>
                
                <div className="profileRightBottom">
                <FeedComponent username={payload.userName} />
                <RightSideBarComponent user={payload} />
                </div>
            </div>
        </div>  
      </>
    );
};

export default ProfilePage;