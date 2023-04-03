import { setCookie, getCookie, deleteCookie } from "./cookies"
import { getLocalStorage, setLocalStorage, deleteLocalStorage } from "./localstorage";


export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
};
export const isAuthenticated = () => {
    if(getCookie('token') && getLocalStorage('user'))
    {
        return getLocalStorage('user');
    } else {
        return false;
    }
}

export const logout = (next) => {
    deleteCookie('token');
    deleteLocalStorage('user');

    next();

};