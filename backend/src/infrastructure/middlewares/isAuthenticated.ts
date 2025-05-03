import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    
    if (!token) {
        res.status(401).json({ message: "Access token required" });
        return;
    }
    (req as any).token = token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

