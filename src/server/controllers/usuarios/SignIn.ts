import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/validations';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),
});

export const signInValidation = validation({
    body: bodyValidation,
});

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body;

    const result = await UsuariosProvider.getByEmail(email);
    
    if(result instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos'
            }
        });
    }
    
    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos'
            }
        });
    } else {
        return res.status(StatusCodes.OK).json({ access: 'teste.teste.teste' });
    }
};