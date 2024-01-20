import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
    id?: number;
}
interface IBodyProps extends Omit<ICidade, 'id'> {}

const updateByIdParamValidation: yup.ObjectSchema<IParamProps> = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3),
});

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
    const result = await CidadesProvider.updateById(req.params.id, req.body);
    
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send('Alteração realizada com sucesso.');
};