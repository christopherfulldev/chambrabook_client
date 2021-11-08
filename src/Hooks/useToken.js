import {
  useState
} from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const savedToken = (userToken) => {
    localStorage.setItem("token", userToken.token);
    localStorage.setItem("payload", JSON.stringify(userToken.payload));
    setToken(userToken);
  };
  return {
    setToken: savedToken,
    token
  };
};

export default useToken;