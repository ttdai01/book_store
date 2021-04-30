"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const secret_utils_1 = require("../../../utils/secret-utils");
class CognitoService {
    static setup() {
        return Promise.all([
            secret_utils_1.getJsonSecret('USER_POOL_ID'),
            secret_utils_1.getJsonSecret('APP_CLIENT_ID')
        ]).then(data => ({
            UserPoolId: data[0],
            ClientId: data[1]
        }));
    }
}
exports.CognitoService = CognitoService;
;
//# sourceMappingURL=cognito-services.js.map