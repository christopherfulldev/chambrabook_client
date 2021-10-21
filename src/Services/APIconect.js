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

}

export default new APIconnection();