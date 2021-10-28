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

  registerCreator = ({name, lastName, userName, age, email, password}) => {
    return this.api.post("/register", {
      name,
      lastName,
      age,
      userName,
      email,
      password})
}
  
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

  sendMessages = (message) => {
    return this.api.post("/sendmessage", message);
  }

  getFriends = (currentId) => {
    return this.api.get(`/friends/${currentId}`);
  };

  getConversations = (user, currentId) => {
    return this.api.get(`/conversation/find/${currentId}/${user._id}`)
  };

  getConversationsBetweenUsers = (userId, friendId) => {
    return this.api.get(`/conversation/find/${userId}/${friendId}`);
  };

  getAllUserPosts = (username) => {
      return this.api.get(`/post/profile/${username}`);
  };

  getTimeLinePost = (userId) => {
    return this.api.get(`/post/timeline/${userId}`);
  };

  uploadUserPost = (post, currentUser) => {
    return this.api.put(`/post/like/${post._id}`, {userId: currentUser._id});
  };

  getFriends = (user) => {
  return this.api.get(`/friend/${user._id}`)
  };

  unFollowingsUploadData = (user, currentUser) => {
    return this.api.put(`/user/${user._id}/unfollow`, {userId: currentUser._id});
  };

  followingsUploadData = (user, currentUser) => {
    return this.api.put(`/user/${user._id}/unfollow`, {userId: currentUser._id})
  };

  uploadInsideProfilePic = (file, newPost) => {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    newPost.image = fileName;
    return this.api.put('/user/uploadimage', fileName, data);
  }

  postOne = (newPost) => {
    return this.api.post("/post", newPost);
  }

};

export default new APIconnection();