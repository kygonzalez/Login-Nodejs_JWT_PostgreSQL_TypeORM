import {Router} from 'express'
import {index} from '../controllers/test.controllers'

const router = Router()

router.get('/', index)

//router.get('/login', login)

export default router
