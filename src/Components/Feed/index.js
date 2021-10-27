import "./index.css";

import PostComponent from "../../Components/Post";
import ShareComponent from "../../Components/Share";

import APIconnection from "../../Services/APIconect";
import {AuthContext} from "../../Context/Auth.Context";

import { useContext, useEffect, useState } from "react";

const FeedComponent = ({username}) => {
    const [posts, setPosts] = useState([]);
    const [user] = useContext(AuthContext);

    useEffect(()=> {
        try {
            const response = username ? async () => await APIconnection.getAllUserPosts() 
                : async() => await APIconnection.getTimeLinePost();
                // setPosts(response.data.sort((output1, output2) => {
                //     return new Date(output2.createdAt) - new Date (output1.createdAt);
                // }));
        } catch (error) {
            throw new Error("Error, while recovery Data, try again")
        };
    }, [username, user]);

    return (
        <div className="feed">
            {/* <div className="feedWrapper">
                {(!username || username === user.username) && <ShareComponent />}
                {posts.map((post) => (
                <PostComponent key={post._id} post={post} />
                ))}
            </div> */}
        </div>
    );
};

export default FeedComponent;