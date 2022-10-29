<<<<<<< HEAD
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useFlags } from "flagsmith/react"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GroupConfirm from "./GroupConfirm";
import { createGroup } from "../../../api/groups";
import ScoringInputs from "./ScoringInputs";
import useToggleModal from "../../../hooks/useToggleModal";
import Modal from "../../../common/Modal/Modal";
import {
  Button,
  Input,
  Label,
  Form,
  TextareaInput,
  Select,
  Text,
  TextGroup
} from "../../../common/common.styles";
import { groupsSchema } from "../../../validationSchemas/groups";

function CreateGroupForm({ updateList }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const { values, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      manifesto: "",
      scoringFull: 3,
      scoringWinner: 1,
      scoringNone: 0,
      timeLimit: 0,
      limitByPhase: "false"
    },
    validationSchema: groupsSchema.create,
  });
  const flags = useFlags(["show_admin_functions"])

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    toast.promise(
      createGroup({
        name: values.name.trim().toUpperCase(),
        rules: {
          manifesto: values.manifesto,
          scoring: {
            FULL: values.scoringFull,
            WINNER: values.scoringWinner,
            NONE: values.scoringNone,
          },
          timeLimit: values.timeLimit,
          limitByPhase: values.limitByPhase === "true"
        },
      })
        .then(() => {
          updateList();
          navigate(`/groups/${values.name.trim().toUpperCase()}`);
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: "Creando grupo...",
        success: "Grupo creado con éxito. Redirigiendo...",
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };
  const handleShowFormSwitch = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">
            <Input
              type="text"
              placeholder="Nombre del nuevo grupo"
              name="name"
              required
              value={values.name}
              onChange={handleChange}
              showUppercase
              maxLength={20}
              borderError={errors.name}
            />
            {errors.name && (
              <Text
                size="0.85rem"
                color="red"
                align="left"
                margin="-0.2rem 0.65rem"
              >
                *{errors.name}
              </Text>
            )}
          </Label>
          <Label htmlFor="manifesto">
            <TextareaInput
              type="text"
              placeholder={
                "Reglamento (los miembros deberán aceptar estos términos al ingresar)" +
                "\n\n" +
                "¿Qué se apuesta? ¿Hay prenda para el último?"
              }
              name="manifesto"
              required
              value={values.manifesto}
              onChange={handleChange}
              rows="10"
              maxLength="1024"
              borderError={errors.manifesto}
            />
            {errors.manifesto && (
              <Text
                size="0.85rem"
                color="red"
                align="left"
                margin="-0.2rem 0.65rem"
              >
                *{errors.manifesto}
              </Text>
            )}
          </Label>
          <ScoringInputs values={values} handleChange={handleChange} />
          <Text size=".8rem" align="center">
            ¿Hasta cuando se podrán realizar las predicciones?
          </Text>
          {flags.show_admin_functions.enabled && 
          <TextGroup align="center" margin="0">
            <Label htmlFor="DontLimitByPhase">
                <TextGroup margin="0">
                    <Text>Por partido</Text>
                    <Input type="radio" name="limitByPhase" id="DontLimitByPhase" 
                        value={false} onChange={handleChange} checked={values.limitByPhase==="false"} />
                </TextGroup>
            </Label>
            <Label htmlFor="DoLimitByPhase">
                <TextGroup margin="0">
                    <Text>Por fase</Text>
                    <Input type="radio" name="limitByPhase" id="DoLimitByPhase" 
                        value={true} onChange={handleChange} checked={values.limitByPhase==="true"} />
                </TextGroup>
            </Label>
          </TextGroup>}
          <Label htmlFor="timeLimit">
            <Select
              value={values.timeLimit}
              name="timeLimit"
              onChange={handleChange}
            >
              <option value={0} defaultChecked>
                {values.limitByPhase === "true" ? 
                    "Al comenzar la fase" : "Al comienzo del partido" }
              </option>
              <option value={1000 * 60 * 60 * 1}>
                {values.limitByPhase === "true" ? 
                    "Una hora antes de la fase" : "Una hora antes del partido" }
              </option>
              <option value={1000 * 60 * 60 * 12}>
                {values.limitByPhase === "true" ? 
                    "Doce horas antes de comenzar la fase" : "Doce horas antes de comenzar el partido" }
              </option>
              <option value={1000 * 60 * 60 * 24}>
                {values.limitByPhase === "true" ? 
                    "Un día antes de comenzar la fase" : "Un día antes de comenzar el partido" }
              </option>
            </Select>
          </Label>
          <Button
            type="button"
            disabled={isLoading || !isEmpty(errors) || isEmpty(values.name)}
            onClick={toggleModal}
          >
            Crear grupo
          </Button>
          <Modal show={showModal} toggle={toggleModal}>
            <GroupConfirm
              groupName={values.name.trim().toUpperCase()}
              userGroupData={{
                manifesto: values.manifesto,
                scoring: {
                  FULL: values.scoringFull,
                  WINNER: values.scoringWinner,
                  NONE: values.scoringNone,
                },
                timeLimit: values.timeLimit,
                limitByPhase: values.limitByPhase === "true"
              }}
              confirmText="Crear grupo"
            />
          </Modal>
        </Form>
      )}
      <Button
        onClick={handleShowFormSwitch}
        grayscale={showForm}
        padding="10px"
      >
        {showForm ? "Ocultar" : "Crear un nuevo grupo"}
      </Button>
    </>
  );
}

export default CreateGroupForm;
=======
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GroupConfirm from "./GroupConfirm";
import { createGroup } from "../../../api/groups";
import ScoringInputs from "./ScoringInputs";
import useToggleModal from "../../../hooks/useToggleModal";
import Modal from "../../../common/Modal/Modal";
import {
  Button,
  Input,
  Label,
  Form,
  TextareaInput,
  Select,
  Text,
} from "../../../common/common.styles";
import { groupsSchema } from "../../../validationSchemas/groups";

function CreateGroupForm({ updateList }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const { values, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      manifesto: "",
      scoringFull: 3,
      scoringWinner: 1,
      scoringNone: 0,
      timeLimit: 0,
    },
    validationSchema: groupsSchema.create,
  });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    toast.promise(
      createGroup({
        name: values.name.trim().toUpperCase(),
        rules: {
          manifesto: values.manifesto,
          scoring: {
            FULL: values.scoringFull,
            WINNER: values.scoringWinner,
            NONE: values.scoringNone,
          },
          timeLimit: values.timeLimit,
        },
      })
        .then(() => {
          updateList();
          navigate(`/groups/${values.name.trim().toUpperCase()}`);
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: "Creando grupo...",
        success: "Grupo creado con éxito. Redirigiendo...",
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };
  const handleShowFormSwitch = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">
            <Input
              type="text"
              placeholder="Nombre del nuevo grupo"
              name="name"
              required
              value={values.name}
              onChange={handleChange}
              showUppercase
              maxLength={20}
              borderError={errors.name}
            />
            {errors.name && (
              <Text
                size="0.85rem"
                color="red"
                align="left"
                margin="-0.2rem 0.65rem"
              >
                *{errors.name}
              </Text>
            )}
          </Label>
          <Label htmlFor="manifesto">
            <TextareaInput
              type="text"
              placeholder={
                "Reglamento (los miembros deberán aceptar estos términos al ingresar)" +
                "\n\n" +
                "¿Qué se apuesta? ¿Hay prenda para el último?"
              }
              name="manifesto"
              required
              value={values.manifesto}
              onChange={handleChange}
              rows="10"
              maxLength="1024"
              borderError={errors.manifesto}
            />
            {errors.manifesto && (
              <Text
                size="0.85rem"
                color="red"
                align="left"
                margin="-0.2rem 0.65rem"
              >
                *{errors.manifesto}
              </Text>
            )}
          </Label>
          <ScoringInputs values={values} handleChange={handleChange} />
          <Label htmlFor="timeLimit">
            <Text size=".8rem" align="center">
              ¿Hasta cuando se podrán realizar las predicciones?
            </Text>
            <Select
              value={values.timeLimit}
              name="timeLimit"
              onChange={handleChange}
            >
              <option value={0} defaultChecked>
                Al empezar el partido
              </option>
              <option value={1000 * 60 * 60 * 1}>
                Una hora antes del partido
              </option>
              <option value={1000 * 60 * 60 * 12}>
                Doce horas antes del partido
              </option>
              <option value={1000 * 60 * 60 * 24}>
                Un día antes del partido
              </option>
            </Select>
          </Label>
          <Button
            type="button"
            disabled={isLoading || !isEmpty(errors) || isEmpty(values.name)}
            onClick={toggleModal}
          >
            Crear grupo
          </Button>
          <Modal show={showModal} toggle={toggleModal}>
            <GroupConfirm
              groupName={values.name.trim().toUpperCase()}
              userGroupData={{
                manifesto: values.manifesto,
                scoring: {
                  FULL: values.scoringFull,
                  WINNER: values.scoringWinner,
                  NONE: values.scoringNone,
                },
                timeLimit: values.timeLimit,
              }}
              confirmText="Crear grupo"
            />
          </Modal>
        </Form>
      )}
      <Button
        onClick={handleShowFormSwitch}
        grayscale={showForm}
        padding="10px"
      >
        {showForm ? "Ocultar" : "Crear un nuevo grupo"}
      </Button>
    </>
  );
}

export default CreateGroupForm;
>>>>>>> a4568261c9c39d5bc652e02819e8ff5c29600dce
