import { useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Home() {
  
  const { logout , token } = useAuth();
  const [ secureData, setSecureData] = useState(null);
  const [ error, setError] = useState(null);
  const navigate = useNavigate();

 

  useEffect(() =>{
    
    if (!token)  navigate("/login");
     // only run if token exists
    const fetchSecureData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/secure-data?token=${token}`);
        if (!res.ok) navigate("/login");
        const data = await res.json();
        setSecureData(data.message);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    if(token){  
      fetchSecureData();
    }
  }, [token, navigate]);


  return (
      <div>
      { token ? (
      <div><h2>Welcome {secureData}</h2>
      <button onClick={logout}>Logout</button>    </div>
      ) : (
        <h2>Please log in {error}</h2>
      )}
      </div>
  );
}