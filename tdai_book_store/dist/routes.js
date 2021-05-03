"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomeController = __importStar(require("./controllers/home"));
const BookController = __importStar(require("./domain/book-store/controllers"));
const DumbController = __importStar(require("./domain/dumb/controllers"));
const AuthController = __importStar(require("./domain/security/controllers"));
const auth_middleware_1 = __importDefault(require("./domain/security/auth-middleware"));
const router = express_1.Router();
const authorizeRouter = express_1.Router();
authorizeRouter.use(auth_middleware_1.default.validateToken);
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
authorizeRouter.get('/', HomeController.greetings);
router.post('/books', BookController.insert);
router.get('/env', DumbController.getEnv);
authorizeRouter.get('/home-with-lock', HomeController.greetings);
router.use(authorizeRouter);
exports.default = router;
//# sourceMappingURL=routes.js.map