import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity({name: 'confirmation_link'})
export class ConfirmationLink extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'confirmation_link_id'})
    confirmationLinkId: number;

    @Column('timestamp', {default: new Date()})
    expiry: Date;

    @Column({unique: true})
    token: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;
}