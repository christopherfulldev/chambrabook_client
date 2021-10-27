import "./index.css";

import {Nav} from "react-bootstrap";


const NavbarComponent = (props) => {

    return(
        <nav>
            <h3 className="title">
            <img src="../../../public/Screenshot from 2021-10-25 19-31-07.png" alt="" className="logo-img"/> 
            Welcome To Chambrabook</h3>
            <Nav fill variant="tabs" defaultActiveKey="/home" className="nav-bar">
            <Nav.Item>
            <Nav.Link href="/">Inicio</Nav.Link>
            </Nav.Item> 
            <Nav.Item>
            <Nav.Link href="/friends" eventKey="Firends#">Friends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/albuns" eventKey="Albuns#">Albuns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="Matches" eventKey="Matches#">Matches</Nav.Link>
            </Nav.Item>
            </Nav>
        </nav>       
    )   
}

export default NavbarComponent;