import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import {ObjectType, Field, ID} from "type-graphql";
import {User} from "./User";
import {Role} from "./Role";

@ObjectType()
@Entity({name: 'user_role'})
export class UserRole extends BaseEntity {
    @Field(()=> ID)
    @PrimaryGeneratedColumn({name: 'user_role_id'})
    userRoleId: number;

    @Field(()=> ID)
    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Field(()=> ID)
    @ManyToOne(() => Role, role => role.roleUsers)
    @JoinColumn({ name: "role_id"})
    role: Role;
}