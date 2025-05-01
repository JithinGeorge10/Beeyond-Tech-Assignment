import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { userRouter } from "./infrastructure/routes/userRoutes";
import { deliveryPartnerRouter } from "./infrastructure/routes/deliveryPartnerRoutes";
import { adminRouter } from "./infrastructure/routes/adminRoutes";
import { connectDb } from "./infrastructure/db/dbConnection";

const app=express()
connectDb();
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.use(morgan('dev'))

app.use(cors({
    origin: process.env.FRONTEND, // no trailing slash
    exposedHeaders: ['Authorization'], 
    credentials: true, // if you need cookies or auth
  }));

app.use("/api/customer", userRouter);
app.use("/api/deliveryPartner", deliveryPartnerRouter);
app.use("/api/admin", adminRouter);


app.listen(PORT,()=>{
    console.log('server started at port 4000');
})