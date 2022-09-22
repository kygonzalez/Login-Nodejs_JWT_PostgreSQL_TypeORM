import {Request,Response} from 'express'

//I send user to show in interface
export const index = (req: Request,res: Response)=>{
    res.render('index',{user: req.body.user})
}

//Sending false to alert to avoid and undefined variable in login interface
export const login = (req: Request,res: Response)=>{
    res.render('login',{alert:false})
}

export const register = (req: Request,res: Response)=>{
    res.render('register')
}