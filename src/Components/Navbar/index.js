import "./index.css";

import {Nav} from "react-bootstrap";


const NavbarComponent = () => {

    return(
        <nav>
            <h3 className="title"><img/>Chambrabook</h3>
            <Nav fill variant="tabs" defaultActiveKey="/home" className="nav-bar">
            <Nav.Item>
            <Nav.Link href="/">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Firends#">Friends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Albuns#">Albuns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Matches#">Matches</Nav.Link>
            </Nav.Item>
            </Nav>
        </nav>       
    )   
}

export default NavbarComponent;