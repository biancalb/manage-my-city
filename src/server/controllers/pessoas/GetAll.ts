import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

const getAllQueryValidation: yup.ObjectSchema<IQueryProps> = yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
});

export const getAllValidation = validation({
    query: getAllQueryValidation,
});

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 7;
    const filter = req.query.filter || '';

    const result = await PessoasProvider.getAll(page, limit, filter);

    const count = await PessoasProvider.count(filter);

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