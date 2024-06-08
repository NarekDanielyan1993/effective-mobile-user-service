import { USER_VALIDATION_ERRORS } from 'constant/error';
import z from 'zod';

export const userValidationSchema = z.object({
    name: z
        .string()
        .max(32, { message: USER_VALIDATION_ERRORS.NAME_MAX })
        .min(2, { message: USER_VALIDATION_ERRORS.NAME_MIN }),
});
