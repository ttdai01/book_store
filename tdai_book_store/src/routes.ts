import { Router } from 'express';
import * as HomeController from './controllers/home';
import * as BookController from './domain/book-store/controllers';
import * as DumbController from './domain/dumb/controllers';
import * as AuthController from './domain/security/controllers'
// import AuthMiddleware from './middleware/auth-middleware';
const router = Router();

const authorizeRouter = Router();

// authorizeRouter.use(AuthMiddleware.validateToken);

router.post('/auth/login', AuthController.login);
router.get('/home', HomeController.greetings);
router.post('/books', BookController.insert);
router.get('/env', DumbController.getEnv);
authorizeRouter.get('/home-with-lock', HomeController.greetings)


router.use(authorizeRouter);

export default router;