import HelloResolver from "./Hello/Hello";
import RegisterResolver from "./User/Register";
import LoginResolver from "./User/Login";
import MeResolver from "./User/Me";
import RefreshTokenResolver from "./User/RefreshToken";
import RoleListResolver from "./Role/RoleList";
import RoleCreateResolver from "./Role/RoleCreate";
import MyRolesResolver from "./User/MyRoles";
import RoleDeleteResolver from "./Role/RoleDelete";
import UserListResolver from "./User/UserList";
import UserRoleListResolver from "./User/UserRoleList";
import UserRoleCreateResolver from "./User/UserRoleCreate";
import UserRoleDeleteResolver from "./User/UserRoleDelete";

const Resolvers = [
    MeResolver,
    MyRolesResolver,
    HelloResolver,
    RegisterResolver,
    LoginResolver,
    RefreshTokenResolver,
    RoleListResolver,
    RoleCreateResolver,
    RoleDeleteResolver,
    UserListResolver,
    UserRoleListResolver,
    UserRoleCreateResolver,
    UserRoleDeleteResolver
];

export default Resolvers;