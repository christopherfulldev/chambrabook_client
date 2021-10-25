import "./index.css";

import FooterComponent from "../../Components/Footer";
import AlbumComponent from "../../Components/Album"
import SignUpComponent from "../../Components/Signup";
import LoginComponent from "../../Components/Login";
import NavbarComponent from "../../Components/Navbar";
import ProfilePage from "../../Pages/Profile_page";

import useToken from "../../Hooks/useToken";
import {Switch, Route, Redirect, Link} from "react-router-dom";

const LandingPage = (props) => {
    const withoutLogin = props.haveLogin;
    return(
        <div >
        <Switch>
            <LoginComponent useToken={useToken}/> 
        </Switch>
        </div>
    );
};

export default LandingPage;
