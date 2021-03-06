import { object, string } from 'yup';

const fields = {
  email: string().email('Ingresa un email valido').required('Ingresa un email'),
  password: string()
    .min(6, 'La contraseña tiene que tener al menos 6 caracteres')
    .required('Ingresar contraseña'),
  name: string().nullable(),
  groupName: string().max(
    20,
    'El nombre del grupo no puede tener mas de 20 caracteres'
  ),
};

const { email, password, name, groupName } = fields;

export const authSchema = {
  login: object({ email, password }),
  register: object({ name, email, password }),
  forgotPassword: object({ email }),
  changePassword: object({ password }),
};

export const groupsSchema = {
  create: object({ groupName }),
};
