import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(null);

  const login = (user_id) => {
    setUser_id(user_id);
  };

  const logout = () => {
    setUser_id(null);
  };

  return (
    <AuthContext.Provider value={{ user_id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
