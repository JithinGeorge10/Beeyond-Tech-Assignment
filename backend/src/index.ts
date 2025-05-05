import express from 'express'
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import morgan from 'morgan'
import dotenv from 'dotenv';
import cors from 'cors'
import { userRouter } from "./infrastructure/routes/userRoutes"
import { deliveryPartnerRouter } from "./infrastructure/routes/deliveryPartnerRoutes";
import { adminRouter } from "./infrastructure/routes/adminRoutes";
import { healthRouter } from "./infrastructure/routes/healthRoute";
import { connectDb } from "./infrastructure/db/dbConnection";
import { errorHandler } from "./infrastructure/middlewares/errorHandler";
dotenv.config();

const app = express()
connectDb();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND,
    credentials: true
  }
});
export { io };
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.use(morgan('dev'))

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
  exposedHeaders: ['authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/', healthRouter);
app.use("/api/v1/customer", userRouter);
app.use("/api/v1/deliveryPartner", deliveryPartnerRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});
server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server started at port ${PORT}`);
});
///