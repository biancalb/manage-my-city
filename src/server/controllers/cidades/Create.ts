import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade{
    nome: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

export const create = async (req: Request<{},{},ICidade>, res: Response) => {
    let validatedData: ICidade | undefined = undefined;

    try {
        validatedData = await bodyValidation.validate(req.body, { abortEarly: false});

    } catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(err => {
            if (!err.path) return;
            errors[err.path] = err.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({ erros: errors });
    }

    console.log(validatedData);
    res.send('Created');
};