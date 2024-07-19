# MERN Trading App

## Overview

This project is a Trading App built using the MERN stack. The app allows users to trade items with other users, post trades, and send offers. Users can create accounts, log in, and manage their profiles. Real-time interactions are implemented using sockets, enabling live updates for trades and offers.

## Technologies Used

- **Frontend:**
  - React.js
  - Vite
  - React Router for navigation
  - Axios for API requests
  - Socket.io for Real time communication
  - CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for data storage
  - Mongoose as ODM (Object Data Modeling)

- **Authentication:**
  - JSON Web Tokens (JWT) for secure user authentication

## Getting Started

Follow these steps to set up and run the RideSharing Management System on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AliSaif541/MERN-Trading-App.git
   cd MERN-Trading-App
2. **Install Dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
3. **Configure Environment Variables:**
   - Create a .env file in the server directory and configure variables like MongoDB URI and PORT.
4. **Run the Application:**
   - In the server directory, run:
      ```bash
      Copy code
      npm run start
   - In the client directory, run:
      ```bash
      Copy code
      npm run start
5. **Access the Application:**
   - Open your browser and navigate to http://localhost:3000 to use the application.
