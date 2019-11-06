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
import EchoResolver from "./Echo/Echo";
import ConfirmUserResolver from "./User/ConfirmUser";
import ConfirmResendResolver from "./User/ConfirmResend";

const Resolvers = [
    ConfirmUserResolver,
    ConfirmResendResolver,
    EchoResolver,
    HelloResolver,
    LoginResolver,
    MeResolver,
    MyRolesResolver,
    ProfileEditResolver,
    RefreshTokenResolver,
    RegisterResolver,
    RoleCreateResolver,
    RoleDeleteResolver,
    RoleEditResolver,
    RoleListResolver,
    UserEditResolver,
    UserListResolver,
    UserRoleCreateResolver,
    UserRoleDeleteResolver,
    UserRoleListResolver,
];

export default Resolvers;