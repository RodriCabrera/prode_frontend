import { useFormik } from 'formik';
import React, { useState } from 'react';
import { createGroup } from '../../../api/groups';
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function CreateGroupForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { values, handleChange } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    createGroup(values)
      .then((res) => {
        setShowSuccess(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Text size="2rem" align="center">
        Crear nuevo Grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          Nombre del nuevo grupo:
          <Input
            type="text"
            placeholder="Nombre del nuevo grupo"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Crear</Button>
        {isLoading && <Spinner />}
        {error}
        {showSuccess && <Text>Creado con exito</Text>}
      </Form>
    </>
  );
}

export default CreateGroupForm;
