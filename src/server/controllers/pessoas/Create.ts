import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models';
import { PessoasProvider } from '../../database/providers/pessoas';

interface IBodyProps extends Omit<IPessoa, 'id'> {}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required().moreThan(0),
});

export const createValidation = validation({
    body: bodyValidation,
});

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await PessoasProvider.create(req.body);
    
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    return res.status(StatusCodes.CREATED).json(result);
};