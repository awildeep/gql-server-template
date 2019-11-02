import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable} from "typeorm";
import {ObjectType, Field, ID} from "type-graphql";
import {UserRole} from "./UserRole";

@ObjectType()
@Entity({name: 'roles'})
export class Role extends BaseEntity {
    @Field(()=> ID)
    @PrimaryGeneratedColumn({name: 'role_id'})
    roleId: number;

    @Field()
    @Column()
    name: string;

    @Field(()=> [UserRole], {nullable: true})
    @OneToMany(() => UserRole, UserRole => UserRole.role)
    @JoinTable()
    roleUsers:  Promise<UserRole[]>;
}