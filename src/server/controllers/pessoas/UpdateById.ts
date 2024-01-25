import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models';
import { PessoasProvider } from '../../database/providers/pessoas';

interface IParamProps {
    id?: number;
}
interface IBodyProps extends Omit<IPessoa, 'id'> {}

const updateByIdParamValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required().moreThan(0),});

export const updateByIdValidation = validation({
    body: bodyValidation,
    params: updateByIdParamValidation,
});

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro id deve ser informado.'
            }
        });
    } 
    const result = await PessoasProvider.updateById(req.params.id, req.body);
    
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send('Alteração realizada com sucesso.');
};