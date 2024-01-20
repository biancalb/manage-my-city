import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
    id?: number;
}

const getAllQueryValidation: yup.ObjectSchema<IQueryProps> = yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
    id: yup.number().integer().optional().default(0),
});

export const getAllValidation = validation({
    query: getAllQueryValidation,
});

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 7;
    const filter = req.query.filter || '';
    const id = req.query.id;

    const result = await CidadesProvider.getAll(page, limit, filter, id);

    const count = await CidadesProvider.count(filter);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    else if(count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        });
    }
    
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};