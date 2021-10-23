import "./index.css";

import useToken from "../../Hooks/useToken";

import FooterComponent from "../../Components/Footer";
import AlbumComponent from "../../Components/Album"
import SignUpComponent from "../../Components/Signup";
import LoginComponent from "../../Components/Login";
import NavbarComponent from "../../Components/Navbar";
import ProfilePage from "../../Pages/Profile_page";

const LandingPage = (props) => {
    return(
        <div >
            <LoginComponent useToken={useToken}/>
            {/* <SignUpComponent/> */}
        </div>
    );
};

export default LandingPage;
