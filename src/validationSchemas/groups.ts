import { object, string, number, array, date } from "yup";

// TODO Implementar traducción.

const containsBadChars = (
  string: string | undefined,
  allowWhitespace: boolean
) => {
  if (!string) return false;
  return allowWhitespace
    ? /[/"?&$:'#%{}();,+@]/.test(string)
    : /[/"?&$:'#%{}();,+@\s]/.test(string);
};

const fields = {
  name: string()
    .max(20, "Nombre de máximo 20 caracteres")
    .matches(/[a-zA-Z0-9]/, "El nombre debe tener al menos una letra o número")
    .test(
      "El nombre no debe contener caracteres especiales",
      "Debe ser alfanumerico",
      (value) => !containsBadChars(value, true)
    )
    .required("Completar nombre"),
  manifesto: string()
    .max(500, "Máximo 500 caracteres")
    .required("Establece algunas reglas"),
  timeLimit: number().min(0).integer(),
  scoringFull: number().integer(),
  scoringWinner: number().integer(),
  scoringNone: number().integer(),
  extraPredictions: array(
    object({
      key: string()
        .max(20, "Maximo de titulo 20 caracteres")
        .required("Required")
        .test(
          "Bad format",
          "Alfanumerico sin espacios",
          (value) => !containsBadChars(value, false)
        ),
      description: string().max(155, "Max 155"),
      timeLimit: date().default(new Date("11-15-2022 13:00 GMT-0300")),
    })
  ).test(
    "Unique",
    "Los titulos deben ser diferentes",
    (value) =>
      value?.length === [...new Set(value?.map((val) => val.key))].length
  ),
};

const {
  name,
  manifesto,
  timeLimit,
  scoringFull,
  scoringWinner,
  scoringNone,
  extraPredictions,
} = fields;

export const groupsSchema = {
  create: object({
    name,
    manifesto,
    timeLimit,
    scoringFull,
    scoringWinner,
    scoringNone,
  }),
  edit: object({
    name,
    manifesto,
    timeLimit,
    scoringFull,
    scoringWinner,
    scoringNone,
    extraPredictions,
  }),
};
