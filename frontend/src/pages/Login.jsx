import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async(e) => {

    e.preventDefault();

    try {

      const { data } = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",data.token);

      if(data.role === "patient"){
        navigate("/patient");
      }

      if(data.role === "doctor"){
        navigate("/doctor");
      }

      if(data.role === "admin"){
        navigate("/admin");
      }

    } catch(error){
      alert("Login failed");
    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2 rounded">
        Login
        </button>

      </form>

    </div>

  );

}

export default Login;