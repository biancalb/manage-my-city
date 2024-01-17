import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: number;
}

const getValidation: yup.ObjectSchema<IQueryProps> = yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.number().optional(),
});

export const getAllValidation = validation({
    query: getValidation,
});

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
};