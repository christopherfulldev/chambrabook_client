import "./index.css";
import useToken from "../../Hooks/useToken";
import LoginComponent from "../../Components/Login";
import {Nav} from "react-bootstrap";


const NavbarComponent = () => {

    return(
        <nav>
            <h3 className="title"><img/>Chambrabook</h3>
            <Nav fill variant="tabs" defaultActiveKey="/home" className="nav-bar">
            <Nav.Item>
            <Nav.Link href="/Profile">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="link-1">Friends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Friends">Albuns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Matches">Matches</Nav.Link>
            </Nav.Item>
            </Nav>
            <LoginComponent useToken={useToken}/>
        </nav>       
    )   
}

export default NavbarComponent;