import axios from "axios";

class APIconnection {
  
  constructor() {
    this.api = axios.create({
      baseURL: 'https://chambrabookapidb.herokuapp.com/',
    });
  };

  currentChatData = ({currentChat}) => {
    this.setState({currentChat})
    return currentChat
  };
  
  loginAuth = ({userName, password}) => {
    return this.api.post("/login", {username:userName, password});
  };

  getProfilePayload = ({username, token}) => {
    return this.api.get(`/user/finder/${username}`, {headers:{Authorization: token}})
  };

  uploadProfilePic = (file) => {
    const uploadData = new FormData();
    uploadData.append('image', file);
    const { data } = this.api.put('/user/uploadimage', uploadData)
    return data;
  };

  getMessages = (currentChat) => {
    return this.api.get(`/messages/${currentChat?._id}`);
  };

  sendMessages = () => {
    return this.api.post("/sendmessage", message);
  }

  getFriends = (currentId) => {
    return this.api.get(`/friends/${currentId}`);
  };

  getConversations = (user) => {
    return this.api.get(`/conversation/find/${currentId}/${user._id}`)
  };

  getConversationsBetweenUsers = (userId, friendId) => {
    return this.api.get(`/conversation/find/${userId}/${friendId}`);
  };

  getAllUserPosts = (username) => {
      return this.api.get(`/post/profile/${username}`);
  };

  getTimeLinePost = (userId) => {
    return this.api.get(`/post/timeline/${post.userId}`);
  };

  uploadUserPost = (userId) => {
    return this.api.put(`/post/like/${post._id}`, {userId: currentUser._id});
  };

  getFriends = (user) => {
  return this.api.get(`/friend/${user._id}`)
  };

  unFollowingsUploadData = () => {
    return this.api.put(`/user/${user._id}/unfollow`, {userId: currentUser._id});
  };

  followingsUploadData = () => {
    return this.api.put(`/user/${user._id}/unfollow`, {userId: currentUser._id})
  };

  uploadInsideProfilePic = (file) => {
    const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;
    return this.api.put('/user/uploadimage', fileName, data);
  }

  postOne = () => {
    return this.api.post("/post", newPost);
  }

  
};

export default new APIconnection();