import React , { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null = not logged in
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

  const login = async (username) => {
    
    setUser({ name: username }); // mock login
    
    try {
      const res = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.access_token);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,token ,error}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);