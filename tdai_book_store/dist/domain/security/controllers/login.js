"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_services_1 = require("../services/auth-services");
const authService = new auth_services_1.AuthService();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    authService.login(req.body['userName'], req.body['password'])
        .then(result => res.send(result))
        .catch(error => next(error.message));
});
exports.login = login;
//# sourceMappingURL=login.js.map