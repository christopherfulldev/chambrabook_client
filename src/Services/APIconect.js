import axios from "axios";

class APIconnection {
  
  constructor() {
    this.api = axios.create({
      baseURL: 'https://chambrabookapidb.herokuapp.com/',
    })
  }
  
  loginAuth = ({userName, password}) => {
    console.log(userName, password);
    return this.api.post("/login", {username:userName, password});
  };

  getProfilePayload = ({username, token}) => {
    return this.api.get(`/user/finder/${username}`, {headers:{Authorization: token}})
  }
}

export default new APIconnection();