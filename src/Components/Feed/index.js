import "./index.css";

import PostComponent from "../../";
import Share from "../../";

import AuthContext from "../../Context/Auth.Context";

import { useContext, useEffect, useState } from "react";

const FeedComponent = ({username}) => {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(async ()=> {
        try {
            const response = username ? await APIconnection.getAllUserPosts() 
                : await APIconnection.getTimeLinePost();
                setPosts(response.data.sort((output1, output2) => {
                    return new Date(output2.createdAt) - new Date (output1.createdAt);
                }));
        } catch (error) {
            throw new Error("Error, while recovery Data, try again")
        };
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map((post) => (
                <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}