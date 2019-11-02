import HelloResolver from "./Hello/Hello";
import RegisterResolver from "./User/Register";
import LoginResolver from "./User/Login";
import MeResolver from "./User/Me";
import RefreshTokenResolver from "./User/RefreshToken";
import RoleListResolver from "./Role/RoleList";
import RoleCreateResolver from "./Role/RoleCreate";

const Resolvers = [
    MeResolver,
    HelloResolver,
    RegisterResolver,
    LoginResolver,
    RefreshTokenResolver,
    RoleListResolver,
    RoleCreateResolver
];

export default Resolvers;