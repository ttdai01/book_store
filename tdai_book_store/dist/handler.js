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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("./app"));
const mongo_connection_1 = __importDefault(require("./mongo-connection"));
const logger_1 = __importDefault(require("./logger"));
const secret_utils_1 = require("./utils/secret-utils");
const handlerAuto = serverless_http_1.default(app_1.default);
module.exports.handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('--------------------request handling--------------------');
    const mongoConnection = new mongo_connection_1.default(yield secret_utils_1.getJsonSecret('MONGO_URL'));
    mongoConnection.connect(() => {
        app_1.default.listen(app_1.default.get('port'), () => {
            logger_1.default.info('\x1b[36m%s\x1b[0m', // eslint-disable-line
            `🌏 Express server started at http://localhost:${3000}`);
        });
    });
    return handlerAuto(event, context);
});
//# sourceMappingURL=handler.js.map