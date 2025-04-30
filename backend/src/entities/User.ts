import { ObjectId } from "mongoose";

export class User {
  constructor(
    public _id: ObjectId | string,
    public fullName: string,
    public email: string,
    public phoneNumber: number,
    public password: string,
    public deliveryAddress: string,
    public createdAt: Date,
    
  ) {}
}