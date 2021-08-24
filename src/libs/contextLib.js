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
    triggerEvent: () => { },
    modalShow: '',
    setModalShow: () => { },
    resultType: '',
    setResultType: () => { },
    handleLogout: () => { },
    labelsText: '',
    setLabelsText: () => { },
});
export default AppContext;
