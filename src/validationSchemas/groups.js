import { object, string } from 'yup';

const fields = {
  name: string().max(20, 'Máximo 20 caracteres'),
};

const { name } = fields;

export const groupsSchema = {
  create: object({ name }),
};
