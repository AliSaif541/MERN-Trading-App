import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/mytrade.css";
import Header from "../components/Header";
import { Trade } from '../types';

interface Props {
    currentTrade: Trade;
}

const BrowseTrade: React.FC<Props> = ({ currentTrade }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/offer");
    } 

    return (
        <div>
            <Header />
            <div className="custom-trade-detail-container">
                {/* <a href="browse.html" className="custom-back-link">← Back to Browse</a> */}
                <h1 className="custom-trade-title">{currentTrade.title}</h1>
                <img src="../tradeImage.jpg" alt="Trade Image" className="custom-trade-image" />
                <p className="custom-trade-details">
                    {currentTrade.description}
                </p>
                <h3>Accepting Conditions:</h3>
                <ul className="custom-accepting-conditions">
                    {currentTrade.conditions.map((condition, index) => (
                        <li>{condition}</li>
                    ))}
                </ul>
                <button onClick={handleClick} className="custom-offer-trade-btn">Offer Trade</button>
                {/* <a href="#profileLink" className="custom-profile-link">Visit Poster's Profile</a> */}
            </div>

        </div>
    );
};

export default BrowseTrade;
