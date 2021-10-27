import {createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({})
console.log(user, setUser);
return (
        <AuthContext.Provider 
            value={[user, setUser]}
        >{props.children}
        </AuthContext.Provider>
    );
};
