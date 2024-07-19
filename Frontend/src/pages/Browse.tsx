import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/browse.css";
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

const Browse: React.FC<Props> = ({ user, setCurrentTrade }) => {
    const [trades, setTrades] = useState<TradeData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const getTrades = async () => {
            try {
                const url = "http://localhost:9000/api/trade";
                const response = await axios.get<TradeData[]>(url);
                setTrades(response.data);
            } catch (error) {
                console.error("Error fetching trades:", error);
            }
        };
        getTrades();
    }, []);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredTrades = trades.filter(trade =>
        trade.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClick = (trade: TradeData) => {
        setCurrentTrade(trade);
        navigate("/trade");
    } 

    return (
        <div>
            <Header />
            <section className="search-section">
                <input
                    type="text"
                    id="searchBar"
                    placeholder="Search trades..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </section>
                
            <section className="trades-list">
                {filteredTrades.map((trade, index) => (
                    <div className="trade-item" key={index}>
                        <img src="../tradeImage.jpg" alt="Trade Image" className="trade-image" />
                        <div className="trade-info">
                            <h3 className="trade-title">{trade.title}</h3>
                            <p className="trade-description">{trade.description}</p>
                            <div className="trade-conditions">
                                {trade.conditions.map((condition, index) => (
                                    <span className="condition-badge" key={index}>{condition}</span>
                                ))}
                            </div>
                            <p className="profile-name">Posted by: {trade.username}</p>
                        </div>
                        <button className="send-offer-btn" onClick={() => handleClick(trade)}>Send Offer</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Browse;
