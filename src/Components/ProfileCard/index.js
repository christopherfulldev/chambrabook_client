import "./index.css"

import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

const ProfileCardComponent = () => {
    return(
        <div>
            <Card>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Title>Name</Card.Title>
                    <Card.Text>
                    Last name:
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Age:</ListGroupItem>
                    <ListGroupItem>Friends</ListGroupItem>
                    <ListGroupItem>Matches</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Matches</Card.Link>
                    <Card.Link href="#">ChambraMessenger</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProfileCardComponent;