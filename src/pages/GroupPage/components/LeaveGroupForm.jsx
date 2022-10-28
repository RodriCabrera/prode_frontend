import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { leaveGroup, deleteGroup } from "../../../api/groups";
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from "../../../common/common.styles";

function LeaveGroupForm({ updater, toDelete }) {
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: { name: "" } });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      leaveGroup(values.name)
        .then(() => {
          updater();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: "Saliendo del grupo...",
        success: `Saliste del grupo ${values.name}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleDelete = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      deleteGroup(toDelete)
        .then(() => {
          updater();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: "Eliminando grupo",
        success: `Eliminaste el grupo ${values.name}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  return (
    <Form onSubmit={toDelete ? handleDelete : handleSubmit}>
      {toDelete ? (
        <>
          <Text align="center" color="salmon" size="1.3rem">
            ¿Seguro que quieres eliminar este grupo?
          </Text>
          <Text
            align="center"
            color="red"
            size="1.8rem"
            margin="1rem 0rem 0rem 0rem"
          >
            Esta acción no puede deshacerse
          </Text>
        </>
      ) : (
        <>
          <Text align="center" color="salmon" size="1.3rem">
            ¿Seguro que quieres irte?
          </Text>
          <Text align="center" color="salmon">
            Se borrará tu progreso para este grupo
          </Text>
        </>
      )}
      <br />
      <Label htmlFor="name">
        <Text size="1.3rem" align="center">
          Para confirmar ingrese el nombre del grupo
        </Text>
        <Input
          type="text"
          placeholder="Nombre del grupo"
          name="name"
          required
          value={values.name}
          onChange={handleChange}
          showUppercase
        />
      </Label>
      <Button
        type="submit"
        disabled={isLoading || values.name?.toUpperCase() !== name}
      >
        {toDelete ? "Eliminar" : "Salir"}
      </Button>
    </Form>
  );
}

export default LeaveGroupForm;
