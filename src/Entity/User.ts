import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, OneToMany} from "typeorm";
import {ObjectType, Field, ID, Root} from "type-graphql";
import {UserRole} from "./UserRole";
import {Min} from "class-validator";

@ObjectType()
@Entity({name: 'users'})
export class User extends BaseEntity {
    @Field(()=> ID)
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: number;

    @Field()
    @Column({name: 'first_name'})
    firstName: string;

    @Field()
    @Column({name: 'last_name'})
    lastName: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`
    }

    @Field()
    @Column({name: 'is_active'})
    isActive: boolean;

    @Column()
    @Min(5)
    password: string;

    @Field()
    @Column("text", {unique: true})
    email: string;

    @Field(()=> [UserRole], {nullable: true})
    @OneToMany(() => UserRole, UserRole => UserRole.user, {
        eager: true
    })

    @JoinTable()
    userRoles?:  UserRole[];

    @Column('bool', {default: false})
    confirmed: boolean;
}
