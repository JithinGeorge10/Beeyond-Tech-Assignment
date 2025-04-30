import express from 'express'
import morgan from 'morgan'
import { userRouter } from "./infrastructure/routes/userRoutes";
import { deliveryPartnerRouter } from "./infrastructure/routes/deliveryPartnerRoutes";
import { connectDb } from "./infrastructure/db/dbConnection";

const app=express()
connectDb();
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.use(morgan('dev'))


app.use("/api/customer", userRouter);
app.use("/api/deliveryPartner", deliveryPartnerRouter);

app.listen(PORT,()=>{
    console.log('server started at port 4000');
})