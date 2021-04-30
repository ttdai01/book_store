// import { Request, Response } from 'express';
// import { JWK } from 'jwk-to-pem';
// import * as jwkToPem from 'jwk-to-pem';
// import * as jwt from 'jsonwebtoken';
// import { CognitoIdentityServiceProvider } from 'aws-sdk';
// import { findMemberByCognitoUserId } from '../domain/organization/Member';
// import { getJsonSecret } from '../utils/secretsUtil';

// class AuthMiddleware {
//   public validateToken(req: Request, res: Response, next: any) {
//     const unauthorized = () => {
//       res.status(401);
//       return res.send('unauthorized');
//     };

//     const token = req.headers['authorization'];
//     getJsonSecret('PUBLIC_KEY')
//       .then(publicKey => {
//         const publicKeyJson = JSON.parse(publicKey);

//         const keys = publicKeyJson.keys;
//         const pems: any = {};
//         for (let i = 0; i < keys.length; i++) {
//           const keyId = keys[i].kid;
//           const modulus = keys[i].n;
//           const exponent = keys[i].e;
//           const keyType = keys[i].kty;
//           const jwk = { kty: keyType, n: modulus, e: exponent } as JWK;
//           const pem = jwkToPem.default(jwk);
//           pems[keyId] = pem;
//         }
//         const decodedJwt: any = jwt.decode(token, { complete: true });
//         if (!decodedJwt) {
//           unauthorized();
//         }

//         const kid = decodedJwt.header.kid;
//         const pem = pems[kid];
//         if (!pem) {
//           unauthorized();
//         }

//         return jwt.verify(token, pem, (err: any, payload: any) => {
//           if (err) {
//             unauthorized();
//           }

//           const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
//           return Promise.all([
//             cognitoIdentityServiceProvider.getUser({
//               AccessToken: token
//             }).promise(),
//             findMemberByCognitoUserId(payload.sub)
//           ])
//             .then(([cognitoUser, member]) => {
//               req.query.userInfo = member.toObject();
//               const attributes = {
//                 name: cognitoUser?.UserAttributes?.find(e => e.Name === 'name')?.Value,
//                 contactNumber: cognitoUser?.UserAttributes?.find(e => e.Name === 'custom:contactNumber')?.Value,
//                 primaryContactNumber: cognitoUser?.UserAttributes?.find(e => e.Name === 'custom:primaryContactNumber')?.Value,
//                 email: cognitoUser?.UserAttributes?.find(e => e.Name === 'email')?.Value
//               };
//               Object.assign(req.query.userInfo, {
//                 id: member.id,
//                 name: attributes.name,
//                 avatar: member.avatar,
//                 contactNumber: attributes.contactNumber && JSON.parse(attributes.contactNumber),
//                 primaryContactNumber: attributes.primaryContactNumber,
//                 email: attributes.email,
//                 cognitoUserId: payload.sub
//               });
//               return next();
//             })
//             .catch(() => {
//               unauthorized();
//             });
//         });
//       })
//       .catch(() => {
//         unauthorized();
//       });
//   }
// }

// export = new AuthMiddleware();
