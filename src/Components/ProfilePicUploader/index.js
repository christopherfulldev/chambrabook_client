import APIconnection from "../../Services/APIconect";

import { useState, useRef } from "react";
import {Container, Row, Col, Image, Button} from "react-bootstrap";

const ProfilePicUploaderComponent = (props) => {
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const {setPayload} = props;
    const ref = useRef();

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
      setPayload(uploadedProfilePic);
      ref.current.value = ""
    };

      return (
        <div>
          <form clasName="input-file" action="/uploadfile" enctype="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <input clasName="input-file" type='file' onChange={handleChange} placeHolder="Choose File" ref={ref}/>
            <Container className="photo-size">
                <Row>
                  <Image src={imageUrl} thumbnail width={'340vh'} />
                </Row>
            </Container>
          </form>
          <Button onClick={handleSubmit} className="profile-photo-button">Submit</Button>
        </div>
    );
  }
  
  export default ProfilePicUploaderComponent;
