import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
};
