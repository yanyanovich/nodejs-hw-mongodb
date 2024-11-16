import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from "./utils/env.js";
import router from './routers/index.js';

import {errorHandler} from "./middlewares/errorHandler.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import cookieParser from 'cookie-parser';


const PORT = Number(env("PORT", 4000));
export  function setupServer(){
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(router);

    // Middleware для обробких status 404
    app.use('*', notFoundHandler);

    // Middleware для обробких помилок
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
