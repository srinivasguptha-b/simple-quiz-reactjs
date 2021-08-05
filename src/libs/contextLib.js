import { createContext } from "react";

const AppContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (auth) => { },
    userData: {},
    setUserData: () => { },
    currentVideo: '',
    contentLanguage: '',
    setContentLanguage: () => { },
    triggerPageView: () => { },
    triggerEvent: () => { }
});
export default AppContext;
