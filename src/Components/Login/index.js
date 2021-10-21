import "./index.css";

import  Login from "../../Services/APIconect";
import { useState } from "react";
import PropTypes from "prop-types";

const LoginComponent = ({useToken}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {token, setToken} = useToken();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(password, userName);
        const resultToken = await Login.loginAuth({
            userName,
            password
        });
        setToken(resultToken.data.token);
    }
    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="form-group">
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter username"
                    value={userName}
                    onChange={event => setUserName(event.target.value)}
                />
            </div>

            <div className="form-group">
                <input type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
            <input type="submit" className="btn btn-primary btn-block" value="submit"/>
            <p className="forgot-password text-right">
                Forgot <a href="#"> password? </a>
            </p>
        </form>
    )
};

LoginComponent.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginComponent;