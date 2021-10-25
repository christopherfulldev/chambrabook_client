export const LoginStart = (useCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURe"
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: user._id,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: user._id,
});