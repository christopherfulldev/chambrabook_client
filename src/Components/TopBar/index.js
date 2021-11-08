import "./index.css";
import {Button} from "react-bootstrap";
import {AuthContext} from "../../Context/Auth.Context";

import {Link} from "react-router-dom";
import { useContext} from "react";

import { Search, Person, Chat, Notifications } from "@mui/icons-material";

const TopBarComponent = (props) => {
    const [user] = useContext(AuthContext);
    const {
        payload
    } = props;
    const {
        useToken
    } = props;
    const {
        token
    } = useToken();

    const logout = (event) => {
        localStorage.removeItem("token");
        localStorage.removeItem("payload");
        props.history.push("/");
    }

    return(
        <div className="topbarContainer">
            <div className="topbarCenter">
                <div className="searchbar">
                <Search className="searchIcon" />
                <input
                    placeholder="Search for friend, post or video"
                    className="searchInput"
                />
                </div>
            </div>
            
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                
                <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person />
                    <span className="topbarIconBadge">1</span>
                </div>
            
            <div className="topbarIconItem">
                <Chat />
                    <span className="topbarIconBadge">2</span>
            </div>
            
            <div className="topbarIconItem">
                <Notifications />
                <span className="topbarIconBadge">1</span>
            </div>
            </div>
                                                                                    
            <Link to={`/profile/${payload.username}`}>
                <img
                    src={payload.profilePhoto}
                    alt=""
                    className="topbarImg"
                />
            </Link>
            {token && <Button onClick={logout} className="logout-button">Log Out</Button>}
            </div>
        </div>
    );
};

export default TopBarComponent;