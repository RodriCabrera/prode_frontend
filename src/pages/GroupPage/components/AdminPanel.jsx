import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

import { editGroup } from "api/groups";
import ScoringInputs from "../../Groups/components/ScoringInputs";
import { parseInputDate } from "../../pagesHelpers";
import {
  Button,
  Input,
  Label,
  Form,
  TextareaInput,
  Select,
  Text,
  TextGroup,
} from "common/common.styles";
import { Info } from "common/Info/Info";
import { groupsSchema } from "validationSchemas/groups";

export default function AdminPanel({ groupData, updater }) {
  const { values, handleChange, errors, setFieldValue } = useFormik({
    initialValues: {
      name: groupData.name,
      manifesto: groupData.rules.manifesto,
      scoringFull: groupData.rules.scoring.FULL,
      scoringWinner: groupData.rules.scoring.WINNER,
      scoringNone: groupData.rules.scoring.NONE,
      timeLimit: groupData.rules.timeLimit,
      limitByPhase: groupData.rules.limitByPhase ? "true" : "false",
      extraPredictions: groupData.extraPredictions
    },
    validationSchema: groupsSchema.edit,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      editGroup(groupData.id, {
        name: values.name.trim().toUpperCase(),
        rules: {
          manifesto: values.manifesto,
          scoring: {
            FULL: values.scoringFull,
            WINNER: values.scoringWinner,
            NONE: values.scoringNone,
          },
          timeLimit: values.timeLimit,
          limitByPhase: values.limitByPhase === "true",
        },
        extraPredictions: values.extraPredictions,
      }).then((res) => {
        if (res.status === 200) {
          navigate(`/groups/${values.name}`);
          updater(values.name);
        }
      }),
      {
        pending: "Editando grupo...",
        success: "Grupo editado con éxito",
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const isEditAvailable = Date.now() < Date.parse("11-15-2022 13:00 GMT-0300");

  const handleNewCustomPredictionField = () => {
    setFieldValue("extraPredictions", [...values.extraPredictions, {key: "", description: "", timeLimit: "11-20-2022 13:00 GMT-0300"}])
  }
  const handleRemoveCustomEntry = (key) => {
    setFieldValue("extraPredictions", values.extraPredictions.filter(field => field.key !== key))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Info>
        {isEditAvailable
          ? "Podrás editar estos datos hasta 5 días antes del comienzo del mundial"
          : "Ya no puedes editar esta configuración"}
      </Info>
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
          disabled={!isEditAvailable}
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
          disabled={!isEditAvailable}
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
      <ScoringInputs
        values={values}
        handleChange={handleChange}
        disable={!isEditAvailable}
      />
      <Text align="center" margin="1.2rem 0rem 0.2rem">
        ¿Hasta cuando se podrán realizar las predicciones?
      </Text>
      <TextGroup align="center" margin=".2rem">
        <Label htmlFor="DontLimitByPhase">
          <TextGroup margin="0.2rem">
            <Text>Por partido</Text>
            <Input
              type="radio"
              name="limitByPhase"
              id="DontLimitByPhase"
              value={false}
              onChange={handleChange}
              checked={values.limitByPhase === "false"}
              disabled={!isEditAvailable}
            />
          </TextGroup>
        </Label>
        <Label htmlFor="DoLimitByPhase">
          <TextGroup margin="0.2rem">
            <Text>Por fase</Text>
            <Input
              type="radio"
              name="limitByPhase"
              id="DoLimitByPhase"
              value={true}
              onChange={handleChange}
              checked={values.limitByPhase === "true"}
              disabled={!isEditAvailable}
            />
          </TextGroup>
        </Label>
      </TextGroup>
      <Info>
        {values.limitByPhase === "false"
          ? "Cada partido tendrá su fecha límite"
          : "Todos los partidos de cada fase tendrán la misma fecha límite"}
      </Info>
      <Label htmlFor="timeLimit">
        <Select
          value={values.timeLimit}
          name="timeLimit"
          onChange={handleChange}
          disabled={!isEditAvailable}
        >
          <option value={0} defaultChecked>
            {values.limitByPhase === "true"
              ? "Al comenzar la fase"
              : "Al comienzo del partido"}
          </option>
          <option value={1000 * 60 * 60 * 1}>
            {values.limitByPhase === "true"
              ? "Una hora antes de la fase"
              : "Una hora antes del partido"}
          </option>
          <option value={1000 * 60 * 60 * 12}>
            {values.limitByPhase === "true"
              ? "Doce horas antes de comenzar la fase"
              : "Doce horas antes de comenzar el partido"}
          </option>
          <option value={1000 * 60 * 60 * 24}>
            {values.limitByPhase === "true"
              ? "Un día antes de comenzar la fase"
              : "Un día antes de comenzar el partido"}
          </option>
        </Select>
      </Label>
      <Button type="button" onClick={handleNewCustomPredictionField}>Add new custom prediction field</Button>
      {values.extraPredictions[0] && values.extraPredictions.map((field, index) => {
        return (
          <div key={index}>
            <Button type="button" onClick={() => handleRemoveCustomEntry(field.key)}>Remove this field</Button>
            <Label htmlFor={`extraPredictions[${index}].key`}>
              Title
              <Input name={`extraPredictions[${index}].key`} value={field.key} type="text" onChange={handleChange} /> 
            </Label>
            <Label htmlFor={`extraPredictions[${index}].description`}>
              Description
              <Input name={`extraPredictions[${index}].description`} value={field.description} type="text" onChange={handleChange}/> 
            </Label>
            <Label htmlFor={`extraPredictions[${index}].timeLimit`}>
              Deadline
              <Input name={`extraPredictions[${index}].timeLimit`} value={parseInputDate(field.timeLimit)} type="date" onChange={handleChange} />
            </Label>
          </div>
      )
      }) }
      <Button
        type="submit"
        disabled={!isEmpty(errors) || isEmpty(values.name) || !isEditAvailable}
      >
        Confirmar cambios
      </Button>
    </Form>
  );
}
