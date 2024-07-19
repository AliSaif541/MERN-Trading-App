import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { User } from '../types';

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

interface Props {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login: React.FC<Props> = ({ setUser }) => {
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
      const url = "http://localhost:9000/api/user/login";
      const { data: res }: UserResponse = await axios.post(url, data);
      navigate("/");
      setUser(res.data);
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
    <div className="Login">
      <div className="Input-Container">
        <div className="Headings">
          <div>Trading App</div>
        </div>
        <div className="Welcome">Welcome! Please login to your account</div>
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
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
              {error && <div className="custom-error">{error}</div>}
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          <Link className="Link" to="/signup">
            {" "}
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
