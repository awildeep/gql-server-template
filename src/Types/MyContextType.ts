import {Request} from "express";
import {Connection} from "typeorm";
import {User} from "../Entity/User";

export interface MyContextType {
    req: Request;
    user?: User;
    connection?: Connection;
}