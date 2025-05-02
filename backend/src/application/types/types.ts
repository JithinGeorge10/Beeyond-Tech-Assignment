import { Request } from "express";

export interface IRequestWithUser extends Request {
  req: { id: string; token: string; };
  user?: {
    id: string;
    role: string;
    token?: string;
  };
}