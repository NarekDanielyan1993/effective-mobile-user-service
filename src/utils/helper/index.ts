import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'lib/error';
import { ZodRawShape, z } from 'zod';

export const validateRequest =
    <T extends ZodRawShape>(schema: z.ZodObject<T>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            await next();
        } catch (error: any) {
            if (error.name === 'ZodError') {
                const validationError = new ValidationError(
                    error?.issues?.map((issue: any) => ({
                        [issue.path]: issue.message,
                    })),
                );
                next(validationError);
            }
            next(error);
        }
    };
