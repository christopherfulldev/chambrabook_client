import "./index.css"

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import {useState, useEffect} from "react";
import {useParams} from "react-router"

const ProfileComponent = () => {
    const [payload, setPayload] = useState([]);
    const {useToken} = props;
    const {token} = useToken();
    const [user, setuser] = useState({});
    const username = useParams().username;

    useEffect( async (props) => {
        const payloadData = JSON.parse(localStorage.getItem("payload"));
        const pickedPayload = await APIconect.getProfilePayload({...payloadData, token});
        setPayload(pickedPayload.data);
    }, [payload]);

    if(!token) {
        return <Redirect to="/"/>
    }

    return(
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
                                ? PF + user.coverPicture
                                : PF + "person/noCover.png"
                            }
                            alt=""
                        />
                        <img
                            className="profileUserImg"
                            src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                        />
                        </div>
                        <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
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
}


export default ProfileComponent;