import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";

axios.defaults.baseURL = "http://localhost:5000"; 

const Signup = ({setLoggedIn}) => {
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);

  const handleSignup = async function (e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/register", signupData);
      toast.success("User created successfully");
      setUser(data);
      setLoggedIn(() => true);
    } catch (ex) {
      if (ex.response.data.error) {
        toast.error(ex.response.data.error);
      } else {
        toast.error("Something went wrong");
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
            <h2>Signup</h2>
      </div>
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: "15px" }}>
            <input
                type="text"
                placeholder="Name"
                value={signupData.name}
                onChange={(e) =>  setsignupData({ ...signupData, name: e.target.value })}
                required
                style={{
                width: "60%",
                padding: "10px",
                margin: "0px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                }}
            />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email ID"
            value={signupData.email}
            onChange={(e) => setsignupData({ ...signupData, email: e.target.value })}
            required
            style={{
              width: "60%",
              padding: "10px",
              margin: "0px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="number"
            placeholder="Phone Number"
            value={signupData.phone}
            onChange={(e) => setsignupData({ ...signupData, phone: e.target.value })}
            required
            style={{
              width: "60%",
              padding: "10px",
              margin: "0px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => setsignupData({ ...signupData, password: e.target.value })}
            required
            style={{
              width: "60%",
              padding: "10px",
              margin: "0px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <p>Already have an account? Login instead!</p>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
