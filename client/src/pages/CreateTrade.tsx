import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Header from "../components/Header";
import { User } from '../types';

interface tradeData {
  username: string;
  title: string;
  description: string;
  conditions: string[];
  offers: any[];
  acceptedOffers: any;
}

interface ErrorResponse {
  message: string;
}

interface UserResponse {
  data: any;
}

interface Props {
    user: User;
}

const CreateTrade: React.FC<Props> = ({ user }) => {
  const [data, setData] = useState<tradeData>({
    username: user.username,
    title: "",
    description: "",
    conditions: [],
    offers: [],
    acceptedOffers: "",
  });
  const [error, setError] = useState<string>("");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "conditions") {
      const itemsArray = e.target.value.split(",").map(item => item.trim());
      setData({ ...data, [e.target.name]: itemsArray });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/trade/";
      const { data: res }: UserResponse = await axios.post(url, data);
      
      setError("Trade Created!");
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
                    <div>Create Trade</div>
                </div>
                <div className="Welcome-Change-Password">Enter the details of your new trade</div>
                <div className="Input-Form">
                    <form className="Form-Div" onSubmit={handleSubmit}>
                        <div className="input-div">
                        <input
                            className="custom-user-inp"
                            type="title"
                            placeholder="Title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="custom-user-inp"
                            type="description"
                            placeholder="Descritption"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="custom-user-inp"
                            type="conditions"
                            placeholder="Conditions"
                            name="conditions"
                            value={data.conditions}
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

export default CreateTrade;
