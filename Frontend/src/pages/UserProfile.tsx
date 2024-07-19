import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import Header from "../components/Header";
import { Trade, User } from '../types';

interface TradeData {
    username: string;
    title: string;
    description: string;
    conditions: string[];
    offers: any[];
    acceptedOffers: any;
    _id: string;
}

interface Props {
    user: User;
    setCurrentTrade: React.Dispatch<React.SetStateAction<Trade>>;
}

const UserProfile: React.FC<Props> = ({ user, setCurrentTrade }) => {
    const navigate = useNavigate();
    const [trades, setTrades] = useState<TradeData[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate("/change-password");
    };

    const handleTradeClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate("/create-trade");
    };

    useEffect(() => {
        const getTrades = async () => {
            try {
                const url = "http://localhost:9000/api/trade/specific";
                const response = await axios.get<TradeData[]>(url,{
                    params: {
                        username: user.username
                      }
                });

                setTrades(response.data);
            } catch (error) {
                console.error("Error fetching trades:", error);
            }
        };
        getTrades();
    }, []);

    const handleRouteClick = (trade: TradeData) => {
        setCurrentTrade(trade);
        navigate("/my_trade");
    } 

    return (
        <div>
            <Header />
            <section className="profile-content">
                <div className="top-section">
                    <div className="user-info">
                        <img src="../userImage.jpg" alt="User Image" className="user-image" />
                        <div>
                            <h1>{user.name}</h1>
                            <p className="user-username">{user.username}</p>
                            <button onClick={handleClick} className="update-password-btn">Update Password</button>
                            <button onClick={handleTradeClick} className="create-offer-btn">Create Trade Offer</button>
                        </div>
                    </div>
                    <div className="cash-counter">
                        <p>Cash: ${user.cash}</p>
                    </div>
                </div>

                <h2>My Trades</h2>
                {trades.map((trade, index) => (
                    <div className="trade-item">
                        <img src="../tradeImage.jpg" alt="Trade Image" className="trade-image" />
                        <div className="trade-info">
                            <h3 className="trade-title">{trade.title}</h3>
                            <p className="trade-description">{trade.description}</p>
                            <div className="trade-conditions">
                                Conditions:
                                {trade.conditions.map((condition, index) => (
                                    <span className="condition-badge">{condition}</span>
                                ))}
                            </div>
                        </div>
                        <div className="trade-action">
                            <button onClick={() => handleRouteClick(trade)} className="see-trade-status-btn">See Trade Status →</button>
                        </div>
                    </div>
                ))}
                

                <h2>Offers Sent</h2>
                <div className="offers-sent-container">
                    <a href="link-to-offer-details.html" className="offer-tile">
                        <div className="offer-image-container">
                            <img src="../offerImage.jpg" alt="Offer Image" className="offer-image" />
                        </div>
                        <div className="offer-info">
                            <h3 className="offer-title">Offer Title</h3>
                            <p className="offer-description">This is a brief description of the offer.</p>
                        </div>
                        <div className="offer-status">SENT</div>
                    </a>
                </div>
                <div className="offers-sent-container">
                    <a href="link-to-offer-details.html" className="offer-tile">
                        <div className="offer-image-container">
                            <img src="../offerImage.jpg" alt="Offer Image" className="offer-image" />
                        </div>
                        <div className="offer-info">
                            <h3 className="offer-title">Offer Title</h3>
                            <p className="offer-description">This is a brief description of the offer.</p>
                        </div>
                        <div className="offer-status">SENT</div>
                    </a>
                </div>

                <h2>Inventory of Items</h2>
                <h3>Total Items: {user.number_of_items.length}</h3>
                <div className="inventory-tile">
                    {user.number_of_items.map((item, index) => (
                        <h3 className="inventory-title">{index+1}: {item}</h3>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
