"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
class MongoConnection {
    constructor(mongoUrl) {
        /** Mongo connection options to be passed Mongoose */
        this.mongoConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };
        this.startConnection = () => {
            logger_1.default.log({
                level: 'info',
                message: 'Connecting to MongoDB '
            });
            mongoose_1.default.connect(this.mongoUrl, this.mongoConnectionOptions).catch(() => { });
        };
        this.mongoUrl = mongoUrl;
    }
    connect(onConnectedCallback) {
        this.onConnectedCallback = onConnectedCallback;
        this.startConnection();
    }
}
exports.default = MongoConnection;
//# sourceMappingURL=mongo-connection.js.map