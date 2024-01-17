import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';

interface ICidade {
    nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
};