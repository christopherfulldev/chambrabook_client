import APIconnection from "../../Services/APIconect";

import { useState } from "react";
import {Container, Row, Col, Image} from "react-bootstrap";

const ProfilePicUploaderComponent = () => {

    const [file, setFile] = useState()
    const [imageUrl, setImageUrl] = useState()

    const handleChange = (event) => {
      const file = event.target.files[0]
      const imageUrl = URL.createObjectURL(file);
      setFile(file)
      setImageUrl(imageUrl)
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
        const uploadedProfilePic = await APIconnection.uploadProfilePic(file);
    }
  
    
      return (
        <div>
          <form action="/uploadfile" enctype="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label>Chose Your Profile Picture</label>
            <input type='file' onChange={handleChange} />
            <Container>
                <Row>
                    <Image src={imageUrl} thumbnail width={'280vh'} />
                </Row>
            </Container>
          </form>
        </div>
    );
  }
  
  export default ProfilePicUploaderComponent;
