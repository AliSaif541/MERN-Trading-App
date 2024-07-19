import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/trade.css";
import Header from "../components/Header";
import { Trade } from '../types';
import io from "socket.io-client";

const socket = (io as any).connect("http://localhost:9000");

interface TradeData {
    username: string;
    title: string;
    description: string;
    conditions: string[];
    offers: any[];
    acceptedOffers: any;
    _id: string;
}

interface Offer {
    _id: any;
    user: string;
    itemsOffered: string[][];
    cashOffered: number;
    tradeOfferedFor: any;
}

interface Props {
    currentTrade: Trade;
    setCurrentTrade: React.Dispatch<React.SetStateAction<Trade>>;
}

const TradePage: React.FC<Props> = ({ currentTrade, setCurrentTrade }) => {
    // const learningSockets = () => {
    //     socket.emit("send_message", {message: "Hello, world!"});
    // }

    // useEffect(() => {
    //     socket.on("receive_message", (data: any) => {
    //         alert(data.message);
    //     })
    // }, [socket])
    const [fetchedOffers, setFetchedOffers] = useState<Offer[]>([]);

    useEffect(() => {
        // Join room for the current trade
        socket.emit("join_room", currentTrade._id);

        socket.on("offer_created", (data: any) => {
            if (data.tradeId === currentTrade._id) {
                getOffers();
            }
        });

        return () => {
            // Clean up event listeners
            socket.off("offer_created");
        };
    }, [socket]);

    const fetchTrades = async () => {
        const url = "http://localhost:9000/api/trade/offer";
        const response = await axios.get<TradeData>(url, {
            params: { 
                _id: currentTrade._id
            }
        });
        setCurrentTrade(response.data);
    }
    
    const getOffers = async () => {
        for (const offerId of currentTrade.offers) {
            const url = `http://localhost:9000/api/offer`;
            try {
                const response = await axios.get<Offer>(url,  {
                    params: {_id: offerId}
                });
                setFetchedOffers(prevOffers => [...prevOffers, response.data]);
            } catch (error) {
                console.error(`Error fetching offer ${offerId}:`, error);
            }
        }
        console.log("Fetched offers:", fetchedOffers);
    }

    useEffect(() => {
        getOffers();
    }, [])

    return (
        <div>
            <Header />
            <div className="transaction-detail-container">
                <h1 className="transaction-heading">{currentTrade.title}</h1>
                <img src="../transactionImage.jpg" alt="Transaction Image" className="transaction-image" />
                <p className="transaction-details">
                    {currentTrade.description}
                </p>
                <h3>Accepting Conditions:</h3>
                <ul className="accepting-terms">
                    {currentTrade.conditions.map((condition) => (
                        <li>{condition}</li>
                    ))}
                </ul>
                <div className="offers-section">
                    <h3>Offers</h3>
                    {fetchedOffers.map((offer) => (
                        <div className="transaction-offer">
                            <div className="offer-top">
                                <img src="../userImage.jpg" alt="User Image" className="user-avatar" />
                                <div className="user-information">
                                    <p className="user-identifier">@{offer.user}</p>
                                </div>
                            </div>
                            <div className="offer-details">
                                <h4 className="item-name">{currentTrade.title}</h4>
                                <p className="item-quantity">Cash offered:{offer.cashOffered}</p>
                                <p className="offer-price">Items offered: {offer.itemsOffered[0]}</p>
                            </div>
                            <div className="offer-actions">
                                <button className="offer-accept-btn">Accept</button>
                                <button className="offer-reject-btn">Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TradePage;
