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

    @Field(()=> User)
    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Field(()=> Role)
    @ManyToOne(() => Role, role => role.roleUsers, {
        eager: true
    })
    @JoinColumn({ name: "role_id"})
    role?: Role;
}