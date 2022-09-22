import {Router} from 'express'
import {login,index,register} from '../controllers/views.controller'
import {isAuthenticated, registerUser, loginProcess, logout} from '../controllers/auth.controller'

const router = Router()

//Routes for views
router.get('/',isAuthenticated, index)
router.get('/login', login)
router.get('/register', register)

//Routes for auth methods
router.post('/register',registerUser)
router.post('/login',loginProcess)
router.get('/logout',logout)

export default router
