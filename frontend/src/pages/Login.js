import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  
  const { login ,token} = useAuth();
  
  const navigate = useNavigate();
  const [username, setUsername] = useState("");


  const handleLogin = () => {
    login(username); // mock login
    navigate("/"); // redirect to home
  };

  return (
    <div>
      <h2>Login Page</h2>
       <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}