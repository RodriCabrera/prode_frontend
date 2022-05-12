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

function JoinGroupForm({ updateList }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { values, handleChange, errors } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    setShowError(false);
    e.preventDefault();
    joinGroup(values.groupName)
      .then(() => {
        updateList();
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
        <Button type="submit" grayscale={isLoading}>
          {isLoading ? <Spinner /> : 'Unirse'}
        </Button>
        {showError && error && <Text color="red">{error}</Text>}
        {showSuccess && <Text color="green">Te uniste al grupo</Text>}
      </Form>
    </>
  );
}

export default JoinGroupForm;
