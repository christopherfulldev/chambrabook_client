import "./index.css";

import chambraLogo from "../TopBar/Screenshot from 2021-10-25 19-31-07.png";

import {Nav, Button} from "react-bootstrap";

const NavbarComponent = () => {
    return(
        <nav>                                                                   
            <h3 className="title">
            Welcome To Chambrab📖📖ok</h3>
            <p className="sub-title">"Your social network"</p>
            <Nav fill variant="tabs" defaultActiveKey="/home" className="nav-bar">
            <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
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