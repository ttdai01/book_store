"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const isEmpty = (obj) => obj === null
    || obj === ''
    || obj === undefined
    || obj.length === 0
    || (Object.keys(obj).length === 0 && obj.constructor === Object);
exports.isEmpty = isEmpty;
//# sourceMappingURL=object-utils.js.map