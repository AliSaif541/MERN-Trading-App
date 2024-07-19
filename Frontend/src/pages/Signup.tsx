import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

interface UserData {
    name: string;
    username: string;
    password: string;
    cash: number;
    number_of_items: string[];
    trades: any[];
    offers: any[];
}

interface ErrorResponse {
  message: string;
}

interface UserResponse {
  data: any;
}

const Signup = () => {
  const [data, setData] = useState<UserData>({
    name: "",
    username: "",
    password: "",
    cash: 0,
    number_of_items: [],
    trades: [],
    offers: []
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "number_of_items") {
      const itemsArray = e.target.value.split(",").map(item => item.trim());
      setData({ ...data, [e.target.name]: itemsArray });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    //   console.log("data: ", data);
      const url = "http://localhost:9000/api/user";
      const { data: res }: UserResponse = await axios.post(url, data);
      navigate("/login");
    //   setUser(res.data);

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
        <div className="Welcome">Welcome! Please signup to your account</div>
        <div className="Input-Form">
          <form className="Form-Div" onSubmit={handleSubmit}>
            <div className="input-div">
                <input
                  className="custom-user-inp"
                  type="name"
                  placeholder="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
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
              <input
                className="custom-user-inp"
                type="number"
                placeholder="Starting Cash"
                name="cash"
                value={data.cash}
                onChange={handleChange}
                required
              />
              <input
                className="custom-user-inp"
                type="number_of_items"
                placeholder="Starting Number of items"
                name="number_of_items"
                value={data.number_of_items}
                onChange={handleChange}
                required
              />
              {error && <div className="custom-error">{error}</div>}
            </div>
            <button className="login-btn" type="submit">
              Signup
            </button>
          </form>
          <Link className="Link" to="/login">
            <button className="signup-btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
