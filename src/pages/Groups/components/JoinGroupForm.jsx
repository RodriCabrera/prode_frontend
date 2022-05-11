import { useFormik } from 'formik';
import React, { useState } from 'react';
import { joinGroup } from '../../../api/groups';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  //   const userContext = useContext(AuthContext);
  const { values, handleChange, errors } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    joinGroup(values.groupName)
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
        {error}
        {showSuccess && <Text>Creado con exito</Text>}
      </Form>
    </>
  );
}

export default JoinGroupForm;
