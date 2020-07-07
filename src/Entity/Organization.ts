import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, OneToMany} from "typeorm";
import {ObjectType, Field, ID, Root} from "type-graphql";
import {User} from "./User";

@ObjectType()
@Entity({name: 'organizations'})
export class Organization extends BaseEntity {
    @Field(()=> ID)
    @PrimaryGeneratedColumn({name: 'organization_id'})
    organizationId: number;

    @Field()
    @Column({name: 'name'})
    name: string;

    @Field()
    @Column({name: 'is_active'})
    isActive: boolean;

    @Field(()=> [User], {nullable: true})
    @OneToMany(() => User, User => User.organization, {
        eager: true
    })

    @JoinTable()
    users?:  User[];
}
