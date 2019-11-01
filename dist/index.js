"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const EnvironmentConfig_1 = __importDefault(require("./EnvironmentConfig"));
const Resolvers_1 = __importDefault(require("./Resolvers"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const CustomAuthChecker_1 = __importDefault(require("./CustomAuthChecker"));
const path = '/graphql';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection();
    const schema = yield type_graphql_1.buildSchema({
        resolvers: Resolvers_1.default,
        authChecker: CustomAuthChecker_1.default
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                req,
                user: req.user,
                connection
            };
        }
    });
    const app = express_1.default();
    app.use(path, express_jwt_1.default({
        secret: EnvironmentConfig_1.default.JWT_SECRET,
        credentialsRequired: false,
        algorithms: ['RS256'],
    }));
    app.use(cors_1.default({
        credentials: true,
        origin: EnvironmentConfig_1.default.CORS_DOMAIN,
    }));
    apolloServer.applyMiddleware({ app, path });
    app.listen(EnvironmentConfig_1.default.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${EnvironmentConfig_1.default.PORT}${apolloServer.graphqlPath}`);
    });
});
main();
//# sourceMappingURL=index.js.map