import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";

axios.defaults.baseURL = "http://localhost:5000"; 

const Login = ({setLoggedIn}) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
    
  const handleLogin = async function (e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", loginData, {
        withCredentials: true,
      });
      toast.success("Logged in successfully");
      setUser(data);
      setLoggedIn(() => true);
    } catch (ex) {
      console.error("Login error:", ex);
  
      // Log the response for debugging
      console.log("Axios error response:", ex.response);
  
      if (ex.response && ex.response.data && ex.response.data.error) {
        // Show the error from the server
        toast.error(ex.response.data.error);
      } else {
        // Handle unexpected or network errors
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div
      style={{
        backgroundColor: "#E6E6FA",
        borderRadius: "10px",
        color: "#4B0082",
        margin: "50px auto",
        paddingBottom: "20px",
        width: "30%",
        textAlign: "center",
      }}
    >
      <div
        style={{
            borderRadius: "10px",
            backgroundColor: "#4B0082",
            width: "100%",
            color: "#FFF",
            marginBottom: "20px",
            textAlign: "center",
        }}>
            <h2>Login</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email ID"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
            style={{
              width: "60%",
              padding: "10px",
              margin: "3px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            style={{
              width: "60%",
              padding: "10px",
              margin: "3px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <p>Don't have an account? Signup instead!</p>
        <button
          type="submit"
          style={{
            backgroundColor: "#4B0082",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4B0082")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
