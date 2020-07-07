import { Request } from 'express';
import { Connection } from 'typeorm';

export interface MyContextType {
    req: Request;
    user: any;
    connection: Connection;
}
