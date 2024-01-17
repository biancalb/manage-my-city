import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';

interface ICidade {
    nome: string;
    estado: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
    res.send('Created');
};