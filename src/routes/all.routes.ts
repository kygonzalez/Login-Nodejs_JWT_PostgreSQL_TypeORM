import {Router} from 'express'
import {login} from '../controllers/test.controllers'
import {register} from '../controllers/test.controllers'
import {index} from '../controllers/test.controllers'

const router = Router()

router.get('/', index)
router.get('/login', login)
router.get('/register', register)

export default router
