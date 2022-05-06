import { object, string } from 'yup';

export const registerSchema = object({
  name: string().nullable(),
  email: string().email('Inserta un email valido').required('Inserta un email'),
  password: string()
    .min(6, 'La contraseña tiene que tener al menos 6 caracteres')
    .required('Insertar contraseña'),
});
