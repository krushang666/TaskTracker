import React, { useState,useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("Logged_IN");

    if (storedUserLoggedInInformation === "1") {
      setisLoggedIn(true);
    }
  }, []);
  const loginHandler = () => {
    localStorage.setItem("Logged_IN", "1");
    setisLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("Logged_IN");
    setisLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
