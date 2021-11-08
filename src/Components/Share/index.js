import "./index.css";
import APIconnection from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import { useState, useEffect, useContext, useRef} from "react";

import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@mui/icons-material";

const ShareComponent = () => {
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState(null);
    const {
        user
    } = useContext(AuthContext);
    const refBox = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        const newPost = {
            userId: user._id,
            refBox: refBox.current.value
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await APIconnection.uploadInsideProfilePic();
            } catch (error) {
                throw new Error("Error while update, try again");
            }
        } else {
            try {
                await APIconnection.postOne();
                window.location.reload();
            } catch (error) {
                throw new Error("Error while posting, try again");
            };
        };
    };

    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                <img
                    className="shareProfileImg"
                    src={
                    user.profilePicture
                        ? PUBLIC_FILES + user.profilePicture
                        : PUBLIC_FILES + "person/noAvatar.png"
                    }
                    alt=""
                />
                <input
                    placeholder={"What's in your mind " + user.username + "?"}
                    className="shareInput"
                    ref={refBox}
                />
            </div>
                
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
            )}
                
            <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(event) => setFile(event.target.files[0])}
                />
                </label>
                
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon" />
                    <span className="shareOptionText">Tag</span>
                </div>
                    
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon" />
                    <span className="shareOptionText">Location</span>
                </div>
                
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                    <span className="shareOptionText">Feelings</span>
                </div>
                </div>
                <button className="shareButton" type="submit">
                    Share
                </button>
                </form>
            </div>
        </div>
    );
};

export default ShareComponent;
