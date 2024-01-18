import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';

interface IBodyProps extends Omit<ICidade, 'id'> {}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3),
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
};