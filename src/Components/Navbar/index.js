import "./index.css";

const NavbarComponent = () => {
    const token = localStorage.getItem("token");
    return(
        <nav>                                                                   
            <h3 className="title">
            Welcome To Chambrab📖📖ok</h3>
            <p className="sub-title">"Your social network"</p>
        </nav>       
    )   
}

export default NavbarComponent;