import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  // when component is loaded get values from localStorage

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
