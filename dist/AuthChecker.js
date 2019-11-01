"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomAuthChecker = ({ root, args, context, info }, roles) => {
    console.log(root, args, context.req.headers, info, roles);
    return true;
};
exports.default = CustomAuthChecker;
//# sourceMappingURL=AuthChecker.js.map