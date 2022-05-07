import { object, string } from 'yup';

const fields = {
  email: string().email('Inserta un email valido').required('Inserta un email'),
  password: string()
    .min(6, 'La contraseña tiene que tener al menos 6 caracteres')
    .required('Insertar contraseña'),
  name: string().nullable(),
};

const { email, password, name } = fields;

export const authSchema = {
  login: object({ email, password }),
  register: object({ name, email, password }),
  forgotPassword: object({ email }),
};
