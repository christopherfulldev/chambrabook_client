import {useState} from "react";

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken?.token //encadeamento opcional para curto no primeiro acesso sem token
      };

    const [token, setToken] = useState(getToken());

    const savedToken = (userToken) => {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken);
      };
    return {
        setToken: savedToken, 
        token
    };
};

export default useToken;