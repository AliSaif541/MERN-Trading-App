import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Header from "../components/Header";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate("/browse");
    };

    return (
        <div>
            <Header />
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Welcome to TradeBiz!</h1>
                    <p>Your Trading Partner for Life.</p>
                    <button onClick={handleClick} className="btn-browse">Browse our trades collection!</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
