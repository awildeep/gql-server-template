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
import RoleEditResolver from "./Role/RoleEdit";
import ProfileEditResolver from "./User/ProfileEdit";
import UserEditResolver from "./User/UserEdit";

const Resolvers = [
    MeResolver,
    MyRolesResolver,
    ProfileEditResolver,
    HelloResolver,
    RegisterResolver,
    LoginResolver,
    RefreshTokenResolver,
    RoleListResolver,
    RoleCreateResolver,
    RoleDeleteResolver,
    RoleEditResolver,
    UserListResolver,
    UserEditResolver,
    UserRoleListResolver,
    UserRoleCreateResolver,
    UserRoleDeleteResolver
];

export default Resolvers;