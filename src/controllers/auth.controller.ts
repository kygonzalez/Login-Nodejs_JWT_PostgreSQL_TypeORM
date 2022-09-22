import {NextFunction, Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { User } from "../database/User"
import dotenv from  "dotenv"

//To use the environment variables
dotenv.config()

export const registerUser = async (req: Request,res: Response)=>{
    try {

        const{name, user, pass} = req.body

        //To encrypt password
        let passHash = await bcryptjs.hash(pass,8)
        
        //Create and save new user
        const newUser = new User()
        newUser.user = user
        newUser.name = name
        newUser.pass = passHash
        await newUser.save()

        res.redirect("/")

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}

export const loginProcess = async (req: Request,res: Response)=>{
    try {

        const {user, pass} = req.body
        console.log(req.body);

        //Alert if a field are empty
        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle:'Warning',
                alertMessage:"Please write an user and a password",
                alertIcon:'info',
                showConfirmButton:false,
                timer:2000,
                route:'login',
            })
        }else{

            //Search the user in database table
            const userLogin = await User.findOneBy({user: user})

            //If the user or password are wrong
            if(!userLogin || !await bcryptjs.compare(pass,userLogin.pass )){

                res.render('login', {
                    alert: true,
                    alertTitle: "Error", 
                    alertMessage: "Data incorrect",
                    showConfirmButton: true,
                    alertIcon: 'error', 
                    timer: 2000,
                    route: 'login'
                })
            }else{

                //If everything is ok
                const id = userLogin.id

                //Get token for user
                const token = jwt.sign({id: id}, process.env.JWT_SECRET as string, {
                    expiresIn : process.env.JWT_TIME_EXPIRE
                })

                //Save token in cookie
                const cookiesOptions = {
                    expires: new Date(Date.now()+ Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('currentToken',token,cookiesOptions)
                res.render('login',{
                    alert: true,
                    alertTitle: "Success conection", 
                    alertMessage: "Sign in successful!",
                    showConfirmButton: false,
                    alertIcon: 'success', 
                    timer: 2000,
                    route: ''
                })
            }
        }

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}

export const logout = (req: Request, res: Response)=>{
    res.clearCookie('currentToken')
    res.redirect('/')
}

//Middleware
export const isAuthenticated = async (req: Request,res: Response,next: NextFunction)=>{

    //If there is a token saved
    if(req.cookies.currentToken){

        try{

            //Verify token
                //Decoded token
            const decodedInfo = await jwt.verify(req.cookies.currentToken, process.env.JWT_SECRET as string)
            const jsonString: string = JSON.stringify(decodedInfo)
            const decoded = JSON.parse(jsonString)

            //Verify if the user are in database
            const verifyUser = await User.findOneBy({id: decoded.id})

            if(!verifyUser){return next()}

            req.body.user = verifyUser
            return next()

        } catch (error) {
            if(error instanceof Error){
                return res.status(500).json({message:error.message})
            }
        }

    }else{
        res.redirect('/login')
    }

}