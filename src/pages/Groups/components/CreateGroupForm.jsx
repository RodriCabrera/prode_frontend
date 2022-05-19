import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createGroup } from '../../../api/groups';
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from '../../../common/common.styles';

function CreateGroupForm({ updateList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    toast.promise(
      createGroup(values)
        .then(() => {
          updateList();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Creando grupo...',
        success: 'Grupo creado con éxito',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  return (
    <>
      <Text size="2rem" align="center">
        Crear nuevo Grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          <Input
            type="text"
            placeholder="Nombre del nuevo grupo"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit" disabled={isLoading}>
          Crear grupo
        </Button>
      </Form>
    </>
  );
}

export default CreateGroupForm;
