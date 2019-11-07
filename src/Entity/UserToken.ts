import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity({name: 'user_token'})
export class UserToken extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'user_token_id'})
    userTokenId: number;

    @Column('timestamp')
    expiry: Date;

    @Column({unique: true})
    token: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;
}