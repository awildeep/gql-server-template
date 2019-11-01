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
const CustomAuthChecker = ({ context }, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const assignedRolesObjects = yield context.connection.query(`SELECT 
            roles.name
            FROM roles 
            JOIN user_role ON (user_role.role_id = roles.role_id) 
            JOIN users  ON (users.user_id = user_role.user_id)
            WHERE users.user_id = $1 `, [context.user.userId]);
    const assignedRoles = assignedRolesObjects.map((a) => a.name);
    for (let i = 0; i < roles.length; i++) {
        if (!assignedRoles.includes(roles[i])) {
            console.log('Access denied role not found:', roles[i]);
            return false;
        }
        else {
            console.log('Access granted for role:', roles[i]);
        }
    }
    return true;
});
exports.default = CustomAuthChecker;
//# sourceMappingURL=CustomAuthChecker.js.map