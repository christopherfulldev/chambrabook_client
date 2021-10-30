import axios from "axios";

class APIconnection {
  
  constructor() {
    this.api = axios.create({
      baseURL: "https://chambrabookapidb.herokuapp.com/",
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          }
        }
        return config
      },
    );
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

  uploadProfilePic = async (file, username, token) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append("username", username)
    const {data} = await this.api.patch("/user/uploadpicture", uploadData, {headers:{Authorization: token}})
    return data;
  };

  uploadAlbumPic = async (file, username, token) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append("username", username)
    const {data} = await this.api.patch("/user/uploadphoto", uploadData, {headers:{Authorization: token}})
    return data;
  };

  deleteAlbumPic = async (url, username) => {
    const deleteOneAlbumPic = await this.api.delete(
      `/user/${username}/deletephoto/photo?urlphoto=${url}`
      ); 
    const {data} = deleteOneAlbumPic;
    return data;
  }

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