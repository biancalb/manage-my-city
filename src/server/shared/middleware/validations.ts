import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'yup';
import * as yup from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';
type TAllSchemas = Record<TProperty, ObjectSchema<any>>;
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
    const errorsResult: Record<string, Record<string,string>> = {};
    
    Object.entries(schemas).forEach(([key, schema]) =>{
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false});
            
        } catch (err) {
            const yupError = err as yup.ValidationError;
            const errors: Record<string, string> = {};
            
            yupError.inner.forEach(err => {
                if (!err.path) return;
                errors[err.path] = err.message;
            });
            
            errorsResult[key] = errors;
        }
    });
    console.log(Object.entries(errorsResult).length);
    
    if (Object.entries(errorsResult).length == 0) {
        return next();
    } 
    else {
        console.log(errorsResult);
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
};