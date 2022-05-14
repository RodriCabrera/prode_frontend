import { useFormik } from 'formik';
import React, { useState } from 'react';
import { leaveGroup } from '../../../api/groups';
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function LeaveGroupForm({ updateList }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { values, handleChange } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    leaveGroup(values.name)
      .then(() => {
        updateList();
        setShowSuccess(true);
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text size="2rem" align="center">
        Salir de un grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          Nombre del grupo:
          <Input
            type="text"
            placeholder="Nombre del nuevo grupo"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
          />
        </Label>

        <Button type="submit">{isLoading ? <Spinner /> : 'Salir'}</Button>
        {error}
        {showSuccess && <Text>Saliste con exito</Text>}
      </Form>
    </>
  );
}

export default LeaveGroupForm;
