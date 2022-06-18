import { object, string, number } from 'yup';

const fields = {
  name: string().max(20, 'Máximo 20 caracteres').required('Completar nombre'),
  manifesto: string()
    .max(500, 'Máximo 500 caracteres')
    .required('Establece algunas reglas'),
  timeLimit: number().min(0).integer(),
};

const { name, manifesto, scoringFull, scoringWinner, scoringNone, timeLimit } =
  fields;

export const groupsSchema = {
  create: object({
    name,
    manifesto,
    scoringFull,
    scoringWinner,
    scoringNone,
    timeLimit,
  }),
};
