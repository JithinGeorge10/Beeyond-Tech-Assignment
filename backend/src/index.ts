import express from 'express'
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
app.use("/api/customer", userRouter);
app.use("/api/deliveryPartner", deliveryPartnerRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server started at port 4000');
})
