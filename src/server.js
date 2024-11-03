import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from "./utils/env.js";

import {errorHandler} from "./middlewares/errorHandler.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import contacts from "./routers/contacts.js";


const PORT = Number(env("PORT", 4000));
export  function setupServer(){
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(contacts);

    // Middleware для обробких status 404
    app.use('*', notFoundHandler);

    // Middleware для обробких помилок
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
