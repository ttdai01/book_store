import { CognitoIdentityServiceProvider, config } from 'aws-sdk';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { CognitoService } from './cognito-services';
import { region } from '../../../utils/secret-utils';

export class AuthService {
    private config = config;
    private cognitoIdentityServiceProvider: CognitoIdentityServiceProvider;

    constructor() {
      this.config.update({
        region
      });
    }
    public login(userName: string, password: string) {
        return CognitoService.setup()
          .then(poolData => {
            const userPool = new CognitoUserPool(poolData);
    
            return new Promise((resolve, reject) => {
              const authenticationDetails = new AuthenticationDetails({
                Username: userName,
                Password: password
              });
    
              const cognitoUser = new CognitoUser({
                Pool: userPool,
                Username: userName
              });
    
              cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: async result => {
                  resolve({
                    accessToken: result.getAccessToken().getJwtToken(),
                    accessTokenExpiration: result.getAccessToken().getExpiration() * 1000,
                    refreshToken: result.getRefreshToken().getToken()
                  });
                },
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
}