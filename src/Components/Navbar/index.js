import "./index.css";

const NavbarComponent = () => {
    const token = localStorage.getItem("token");
    return(
        <nav>                                                                   
            <h3 className="title">
            Welcome To Chambrab📖📖k</h3>
            <p className="sub-title">"Your social network"</p>
        </nav>       
    )   
}

export default NavbarComponent;