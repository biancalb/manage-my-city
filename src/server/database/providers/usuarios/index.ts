import * as create from './Create';
import * as getByEmail from './GetByEmail';

export const UsuariosProvider = {
    ...create,
    ...getByEmail,
};