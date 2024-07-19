import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';
import UserProfile from './pages/UserProfile';
import { User, Trade } from './types';
import CreateTrade from './pages/CreateTrade';
import Browse from './pages/Browse';
import TradePage from './pages/TradePage';
import BrowseTrade from './pages/BrowseTrade';
import CreateOffer from './pages/CreateOffer';


function App() {
  const [user, setUser]  = useState<User>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log('user: ', user);
  }, [user]);

  const [currentTrade, setCurrentTrade]  = useState<Trade>(() => {
    const storedCurrentTrade = sessionStorage.getItem('currentTrade');
    return storedCurrentTrade ? JSON.parse(storedCurrentTrade) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('currentTrade', JSON.stringify(currentTrade));
    console.log('currentTrade: ', currentTrade);
  }, [currentTrade]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<UserProfile user={user} setCurrentTrade={setCurrentTrade} />} />
          <Route path="/create-trade" element={<CreateTrade user={user} />} />
          <Route path="/browse" element={<Browse user={user} setCurrentTrade={setCurrentTrade} />} />
          <Route path="/my_trade" element={<TradePage currentTrade={currentTrade} setCurrentTrade={setCurrentTrade} />} />
          <Route path="/trade" element={<BrowseTrade currentTrade={currentTrade} />} />
          <Route path="/offer" element={<CreateOffer user={user} currentTrade={currentTrade} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
