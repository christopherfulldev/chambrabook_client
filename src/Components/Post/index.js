import "./index.css";

import APIconnection from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {MoreVert} from "@mui/icons-material";
import {format} from "timeago.js";

const PostComponent = ({post}) => {
    const PUBLIC_FILES = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.lenght);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    useEffect(async () => {
        try {
            const response = await APIconnection.uploadUserPost();
            return setUser(response.data);
        } catch (error) {
            throw new Error("Error while upload post, try again");
        };
    }, [post.user_id]);

    const likesHandler = async () => {
        try {
            await APIconnection.uploadUserPost()
            setLike(isLiked ? like -1 : like +1)
            return setIsLiked(!isLiked);
        } catch (error) {
            throw new Error("Error while save post, try again")
        }
    }

    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img
                        className="postProfileImg"
                        src={
                        user.profilePicture
                            ? PUBLIC_FILES + user.profilePicture
                            : PUBLIC_FILES + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
                </div>
                <div className="postCenter">
                <span className="postText">{post?.refBox}</span>
                <img className="postImg" src={PUBLIC_FILES + post.img} alt="" />
                </div>
                <div className="postBottom">
                <div className="postBottomLeft">
                    <img
                    className="likeIcon"
                    src={`${PUBLIC_FILES}like.png`}
                    onClick={likesHandler}
                    alt=""
                    />
                    <img
                    className="likeIcon"
                    src={`${PUBLIC_FILES}heart.png`}
                    onClick={likesHandler}
                    alt=""
                    />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PostComponent;



