import "reflect-metadata";
import { OpenAPI, useSofa } from 'sofa-api';
import {Schema} from "./Schema";
import Express from "express";

const buildRestDocs = async () => {
    const schema = await Schema();
    const app = Express();
    const openApi = OpenAPI({
        schema,
        info: {
            title: 'API Doc',
            version: '1.0.0',
        },
    });
    app.use(
        '/api',
        useSofa({
            schema,
            onRoute(info) {
                openApi.addRoute(info, {
                    basePath: '/api',
                });
            },
        })
    );
    // writes every recorder route
    openApi.save('./swagger.yml');

};
buildRestDocs();