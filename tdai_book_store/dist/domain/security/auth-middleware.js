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
const jwkToPem = __importStar(require("jwk-to-pem"));
const jwt = __importStar(require("jsonwebtoken"));
const aws_sdk_1 = require("aws-sdk");
const secret_utils_1 = require("../../utils/secret-utils");
const logger_1 = __importDefault(require("../../logger"));
class AuthMiddleware {
    validateToken(req, res, next) {
        logger_1.default.info('----------------validateToken begin----------------');
        const unauthorized = () => {
            res.status(401);
            return res.send('unauthorized');
        };
        const token = req.headers['authorization'];
        secret_utils_1.getJsonSecret('PUBLIC_KEY')
            .then(publicKey => {
            const publicKeyJson = JSON.parse(publicKey);
            const keys = publicKeyJson.keys;
            const pems = {};
            for (let i = 0; i < keys.length; i++) {
                const keyId = keys[i].kid;
                const modulus = keys[i].n;
                const exponent = keys[i].e;
                const keyType = keys[i].kty;
                const jwk = { kty: keyType, n: modulus, e: exponent };
                const pem = jwkToPem.default(jwk);
                pems[keyId] = pem;
            }
            const decodedJwt = jwt.decode(token, { complete: true });
            if (!decodedJwt) {
                unauthorized();
            }
            const kid = decodedJwt.header.kid;
            const pem = pems[kid];
            if (!pem) {
                unauthorized();
            }
            return jwt.verify(token, pem, (err, payload) => {
                if (err) {
                    unauthorized();
                }
                const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
                return cognitoIdentityServiceProvider.getUser({
                    AccessToken: token
                }).promise().then((cognitoUser) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    console.log(cognitoUser);
                    req.query.userInfo = {};
                    const attributes = {
                        nickname: (_b = (_a = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _a === void 0 ? void 0 : _a.find(e => e.Name === 'nickname')) === null || _b === void 0 ? void 0 : _b.Value,
                        phone_number: (_d = (_c = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _c === void 0 ? void 0 : _c.find(e => e.Name === 'phone_number')) === null || _d === void 0 ? void 0 : _d.Value,
                        userName: (_f = (_e = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _e === void 0 ? void 0 : _e.find(e => e.Name === 'userName')) === null || _f === void 0 ? void 0 : _f.Value,
                        picture: (_h = (_g = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _g === void 0 ? void 0 : _g.find(e => e.Name === 'picture')) === null || _h === void 0 ? void 0 : _h.Value,
                        address: (_k = (_j = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _j === void 0 ? void 0 : _j.find(e => e.Name === 'address')) === null || _k === void 0 ? void 0 : _k.Value,
                        default_language: (_m = (_l = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _l === void 0 ? void 0 : _l.find(e => e.Name === 'default_language')) === null || _m === void 0 ? void 0 : _m.Value,
                        email: (_p = (_o = cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.UserAttributes) === null || _o === void 0 ? void 0 : _o.find(e => e.Name === 'email')) === null || _p === void 0 ? void 0 : _p.Value
                    };
                    Object.assign(req.query.userInfo, {
                        nickname: attributes.nickname,
                        phone_number: attributes.phone_number,
                        userName: attributes.userName,
                        picture: attributes.picture,
                        address: attributes.address,
                        default_language: attributes.default_language,
                        cognitoUserId: payload.sub
                    });
                    return next();
                })
                    .catch(() => {
                    unauthorized();
                });
            });
        })
            .catch(() => {
            unauthorized();
        });
    }
}
module.exports = new AuthMiddleware();
//# sourceMappingURL=auth-middleware.js.map