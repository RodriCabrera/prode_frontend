import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { joinGroup } from '../../../api/groups';
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from '../../../common/common.styles';

function JoinGroupForm({ updateList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.promise(
      joinGroup(values.groupName)
        .then(() => {
          updateList();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Uniendote al grupo...',
        success: 'Te uniste al grupo',
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
        Unirse a un Grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="groupName">
          <Input
            type="text"
            placeholder="Nombre del grupo"
            name="groupName"
            required
            value={values.groupName}
            onChange={handleChange}
            showUppercase
          />
        </Label>
        <Button type="submit" disabled={isLoading}>
          Unirse
        </Button>
      </Form>
    </>
  );
}

export default JoinGroupForm;
