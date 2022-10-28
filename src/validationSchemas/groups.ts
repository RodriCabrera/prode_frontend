import { object, string, number } from "yup";

const containsBadChars = (string: string | undefined) =>
  string && /[/"?&$:'#%{}();,+@]/.test(string);

const fields = {
  name: string()
    .max(20, "Nombre de máximo 20 caracteres")
    .matches(/[a-zA-Z0-9]/, "El nombre debe tener al menos una letra o número")
    .test(
      "El nombre no debe contener caracteres especiales",
      "El nombre no debe contener caracteres especiales",
      (value) => !containsBadChars(value)
    )
    .required("Completar nombre"),
  manifesto: string()
    .max(500, "Máximo 500 caracteres")
    .required("Establece algunas reglas"),
  timeLimit: number().min(0).integer(),
};

const { name, manifesto, timeLimit } = fields;

export const groupsSchema = {
  create: object({
    name,
    manifesto,
    timeLimit,
  }),
};
