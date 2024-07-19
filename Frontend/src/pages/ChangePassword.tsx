import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Header from "../components/Header";

interface UserData {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

interface UserResponse {
  data: any;
}

const ChangePassword = () => {
  const [data, setData] = useState<UserData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/user/change-password";
      const { data: res }: UserResponse = await axios.post(url, data);
      // setUser(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResponse = error.response?.data as ErrorResponse;
        setError(errResponse?.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="change-password-container">
        <Header />
        <div className="Login">
            <div className="Input-Container">
                <div className="Headings-Change-Password">
                    <div>Change Password</div>
                </div>
                <div className="Welcome-Change-Password">Enter your new password!</div>
                <div className="Input-Form">
                    <form className="Form-Div" onSubmit={handleSubmit}>
                        <div className="input-div">
                        <input
                            className="custom-user-inp"
                            type="username"
                            placeholder="Username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="custom-user-inp"
                            type="password"
                            placeholder="Change Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                        {error && <div className="custom-error">{error}</div>}
                        </div>
                        <button className="login-btn-change" type="submit">
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChangePassword;
