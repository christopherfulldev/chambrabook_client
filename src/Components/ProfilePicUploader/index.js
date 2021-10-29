import APIconnection from "../../Services/APIconect";

import { useState } from "react";
import {Container, Row, Col, Image, Button} from "react-bootstrap";

const ProfilePicUploaderComponent = (props) => {
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const {setPayload} = props;

    const handleChange = (event) => {
      const file = event.target.files[0];
      const pictureUrl = URL.createObjectURL(file);
      setFile(file);
      setImageUrl(pictureUrl);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const receivedToken = localStorage.getItem("token")
      const username = JSON.parse(localStorage.getItem("payload")).username;
      const uploadedProfilePic = await APIconnection.uploadProfilePic(file, username, receivedToken);
      console.log(uploadedProfilePic);
      setPayload(uploadedProfilePic);
    }
  
    
      return (
        <div>
          <form action="/uploadfile" enctype="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label>Upload Photo</label>
            <input type='file' onChange={handleChange} />
            <Container className="photo-size">
                <Row>
                    <Image src={imageUrl} thumbnail width={'280vh'} />
                </Row>
            </Container>
          </form>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
  }
  
  export default ProfilePicUploaderComponent;
