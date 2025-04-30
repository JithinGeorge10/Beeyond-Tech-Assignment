import { ObjectId } from "mongoose";

export class deliveryPartner {
  constructor(
    public _id: ObjectId | string,
    public fullName: string,
    public email: string,
    public phoneNumber: number,
    public password: string,
    public createdAt: Date,
    
  ) {}
}