import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { joinGroup } from '../../../api/groups';
import { AuthContext } from '../../../common/AuthProvider';
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function JoinGroupForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const userContext = useContext(AuthContext);
  const { values, handleChange, errors } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    setShowError(false);
    e.preventDefault();
    joinGroup(values.groupName)
      .then(() => {
        userContext.update();
        setShowSuccess(true);
      })
      .catch((err) => {
        setShowError(true);
        setError(`Error: ${err.response.statusText}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text size="2rem" align="center">
        Unirse a un Grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="groupName">
          <Text color={errors.groupName ? 'orange' : ''}>
            {errors.groupName ? errors.groupName : 'Nombre del grupo:'}
          </Text>
          <Input
            type="text"
            placeholder="Nombre del grupo"
            name="groupName"
            required
            value={values.groupName}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Unirse</Button>
        {isLoading && <Spinner />}
        {showError && error && <Text color="red">{error}</Text>}
        {showSuccess && <Text color="green">Creado con exito</Text>}
      </Form>
    </>
  );
}

export default JoinGroupForm;
