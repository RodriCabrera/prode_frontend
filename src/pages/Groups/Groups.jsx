import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { createGroup } from '../../api/groups';
import { AuthContext } from '../../common/AuthProvider';
import { Button, Form, Input, Label, Text } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';
// TODO: Darle algo de estilos a esto.

function Groups() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const userContext = useContext(AuthContext);
  const { values, handleChange, errors } = useFormik({ initialValues: {} });
  console.log(userContext.user.groups);
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
    <div>
      <Text size="2rem" align="center">
        Crear nuevo Grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          <Text color={errors.name ? 'orange' : ''}>
            {errors.name ? errors.name : 'Nombre del grupo:'}
          </Text>
          <Input
            type="text"
            placeholder="Nombre del nuevo grupo"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
          />
        </Label>
        <Button>Crear</Button>
        {isLoading && <Spinner />}
        {error}
        {showSuccess && <Text>Creado con exito</Text>}
      </Form>
    </div>
  );
}

export default Groups;
