import * as express from 'express';
import {User} from "../models/User"

interface TokenPayload {
    userId: string;
    role: 'user' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // Ensure this matches your TokenPayload definition
    }
  }
}

  
