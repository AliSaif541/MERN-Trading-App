import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Header from "../components/Header";
import { Trade, User } from '../types';
import io from "socket.io-client";

const socket = (io as any).connect("http://localhost:9000");

interface offerData {
  username: string
  cash: number;
  itemsOffered: string[];
  tradeOfferedFor: any,
}

interface ErrorResponse {
  message: string;
}

interface UserResponse {
  data: any;
}

interface Props {
    user: User;
    currentTrade: Trade
}

const CreateOffer: React.FC<Props> = ({ user, currentTrade }) => {
  const [data, setData] = useState<offerData>({
    username: user.username,
    cash: 0,
    itemsOffered: [],
    tradeOfferedFor: currentTrade._id,
  });
  const [error, setError] = useState<string>("");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "itemsOffered") {
      const itemsArray = e.target.value.split(",").map(item => item.trim());
      setData({ ...data, [e.target.name]: itemsArray });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/offer";
      const { data: res }: UserResponse = await axios.post(url, data);
      
      setError("Offer Sent!");
      socket.emit("offer_created", { tradeId: currentTrade._id });
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
                    <div>Create Offer</div>
                </div>
                <div className="Welcome-Change-Password">Enter your offer for {} trade</div>
                <div className="Input-Form">
                    <form className="Form-Div" onSubmit={handleSubmit}>
                        <div className="input-div">
                            <input
                                className="custom-user-inp"
                                type="number"
                                placeholder="Cash"
                                name="cash"
                                value={data.cash}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="custom-user-inp"
                                type="itemsOffered"
                                placeholder="Items"
                                name="itemsOffered"
                                value={data.itemsOffered}
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

export default CreateOffer;
