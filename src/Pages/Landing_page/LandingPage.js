import "./LandingPage.css";

import NavbarComponent from "../../Components/Navbar";
import LoginComponent from "../../Components/Login";
import SignInComponent from "../../Components/Signin";
import FooterComponent from "../../Components/Footer";

const LandingPage = () => {
    return(
        <div>
        <LoginComponent/>
        <SignInComponent/>
        <img src="../../../public/istockphoto-511990984-612x612.jpg" alt="photo mosaic"/>
        </div>
    );
};

export default LandingPage;