import bcrypt from "bcrypt";
import {User} from "../models/User";
import { RequestHandler } from "express";
import { generateTokenAndSetCookie } from "../utils/genrateToken";

import { IUser } from "../models/User";

export const register:RequestHandler<unknown, unknown, IUser, unknown>  = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const exitingUser = await User.findOne({email})
    if(exitingUser)
      return res.status(400).json({error:"username already exists"})

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email))
      return res.status(400).json({error:"invalid Email format"})
    if (password.length<5)
      return res.status(400).json({error:"password is too short"})

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password:passwordHash,
      shoppingLists:[],
      profilePicture:"",
      preferences: {
        theme: 'light',
      },
      role:'user'
    });

    if (newUser)
    {
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();
      res.status(201).json(newUser);
    }
    
  }catch (err) {
    next(err)
  }
}

export const login:RequestHandler = async (req, res, next) => {
  try {
      const {email,password} = req.body;
      const user = await User.findOne({email});
      if(!user)
        return res.status(400).json({error:"invalid email"})
      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if(!isPasswordCorrect)
        return res.status(400).json({error:"invalid password"})

      generateTokenAndSetCookie(user._id,res)
      res.status(200).json(user);
  } catch (err) {
    next(err)
  }
};

export const logout:RequestHandler = async (req,res, next) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message:"Logout successfully"})
  } catch (err) {
    next(err)
  }
}