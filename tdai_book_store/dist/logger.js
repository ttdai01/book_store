"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logTransports = [];
logTransports.push(new winston_1.transports.Console({
    level: 'debug',
    format: winston_1.format.prettyPrint()
}));
logTransports.push(new winston_1.transports.File({
    level: 'error',
    filename: './logs/error.log',
    format: winston_1.format.json({
        replacer: (key, value) => {
            if (key === 'error') {
                return {
                    message: value.message,
                    stack: value.stack
                };
            }
            return value;
        }
    })
}));
logTransports.push(new winston_1.transports.File({
    level: 'info',
    filename: './logs/info.log',
    format: winston_1.format.json({
        replacer: (key, value) => {
            if (key === 'info') {
                return {
                    message: value.message,
                    stack: value.stack
                };
            }
            return value;
        }
    })
}));
const logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp()),
    transports: logTransports,
    defaultMeta: { app: process.env.APP, stage: process.env.STAGE }
});
exports.default = logger;
//# sourceMappingURL=logger.js.map