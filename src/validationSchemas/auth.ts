import { object, string } from "yup";

const fields = {
  email: string().email("insertValidEmail").required("insertEmail"),
  password: string().min(6, "passRequirements").required("insertPass"),
  name: string()
    .max(20, "usernameRequirementsMax")
    .required("insertUsername")
    .matches(/^[A-Za-z0-9]+$/, "usernameRequirementsMatches"),
  groupName: string().max(20, "groupNameRequirements"),
};

const { email, password, name, groupName } = fields;

export const authSchema = {
  login: object({ email, password }),
  register: object({ name, email, password }),
  forgotPassword: object({ email }),
  changePassword: object({ password }),
};

export const profileSchema = {
  edit: object({ name }),
};

export const groupsSchema = {
  create: object({ groupName }),
};
