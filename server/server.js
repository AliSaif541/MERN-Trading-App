const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { Server } = require("socket.io");
const http = require('http');
const userRoutes = require('./routes/user');
const tradeRoutes = require('./routes/trade');
const offerRoutes = require('./routes/offer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

mongoose.connect(process.env.MONG_URL)
.then(()=>{
    server.listen(process.env.PORT, ()=>{
        console.log(`listening on port ${process.env.PORT}`); 
        console.log("Connected to Database");
    })
})
.catch((error)=>{
    console.log(error);
});

const io = new Server(server, {
    cors: {
      origin: `http://localhost:3000`,
      methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("offer_created", (data) => {
    io.to(data.tradeId).emit("offer_created", data);
  });
});

app.use("/api/user", userRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/offer", offerRoutes); 


module.exports = app;