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
exports.AuthService = void 0;
const aws_sdk_1 = require("aws-sdk");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const cognito_services_1 = require("./cognito-services");
const secret_utils_1 = require("../../../utils/secret-utils");
class AuthService {
    constructor() {
        this.config = aws_sdk_1.config;
        this.config.update({
            region: secret_utils_1.region
        });
        this.cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider();
    }
    login(userName, password) {
        return cognito_services_1.CognitoService.setup()
            .then(poolData => {
            const userPool = new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
            return new Promise((resolve, reject) => {
                const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
                    Username: userName,
                    Password: password
                });
                const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
                    Pool: userPool,
                    Username: userName
                });
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: (result) => __awaiter(this, void 0, void 0, function* () {
                        resolve({
                            accessToken: result.getAccessToken().getJwtToken(),
                            accessTokenExpiration: result.getAccessToken().getExpiration() * 1000,
                            refreshToken: result.getRefreshToken().getToken()
                        });
                    }),
                    onFailure: err => {
                        if (err.code === 'NotAuthorizedException') {
                            if (err.message === 'Incorrect username or password.') {
                                return reject(new Error('Your Email or Password is incorrect. Please check again.'));
                            }
                            if (err.message === 'User is disabled.') {
                                return reject(new Error('This account has been deleted. Please contact admin for more information.'));
                            }
                        }
                        return reject(err);
                    }
                });
            });
        });
    }
    register(user) {
        return cognito_services_1.CognitoService.setup()
            .then(poolData => {
            const userPool = new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
            // find cognito user by email
            return this.cognitoIdentityServiceProvider.listUsers({
                UserPoolId: poolData.UserPoolId,
                Filter: `email = "${user.username}"`
            }).promise()
                .then(users => {
                // Check user is invited
                if (users && users.Users && users.Users.length && users.Users[0].UserStatus === 'FORCE_CHANGE_PASSWORD') {
                    // If user didn't click to link in email then return error
                    if (!user.memberId) {
                        throw new Error('There has been an account using this email. Please login to your email for more information.');
                    }
                    // Create new password
                    return this.cognitoIdentityServiceProvider.adminSetUserPassword({
                        Username: users.Users[0].Username,
                        UserPoolId: poolData.UserPoolId,
                        Permanent: true,
                        Password: user.password
                    }).promise()
                        .then(() => this.cognitoIdentityServiceProvider.adminUpdateUserAttributes({
                        Username: users.Users[0].Username,
                        UserPoolId: poolData.UserPoolId,
                        UserAttributes: [
                            {
                                Name: 'name',
                                Value: user.fullName
                            }
                        ]
                    }).promise())
                        //  change status for invited member
                        .then(() => ({ message: 'Successful registration, a verification link has been sent to your email' }));
                }
                return new Promise((resolve, reject) => {
                    const attributeList = [];
                    attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'email', Value: user.userName }));
                    attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'nickname', Value: user.nickname }));
                    attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'picture', Value: user.picture }));
                    attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'phone_number', Value: user.phone_number }));
                    attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'address', Value: user.address }));
                    attributeList.push(new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'default_language', Value: user.default_language }));
                    userPool.signUp(user.userName, user.password, attributeList, null, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({ message: 'Successful registration, a verification link has been sent to your email' });
                        }
                    });
                });
            });
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth-services.js.map