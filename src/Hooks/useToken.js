import {useState} from "react";

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken; 
      };

    const [token, setToken] = useState(getToken());

    const savedToken = (userToken) => {
        localStorage.setItem("token", JSON.stringify(` Bearer ${userToken.token} `));
        localStorage.setItem("payload", JSON.stringify(userToken.payload));
        setToken(userToken);
      };
    return {
        setToken: savedToken, 
        token
    };
};

export default useToken;