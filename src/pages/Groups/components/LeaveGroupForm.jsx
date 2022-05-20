import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { leaveGroup } from '../../../api/groups';
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from '../../../common/common.styles';

function LeaveGroupForm({ updateList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      leaveGroup(values.name)
        .then(() => {
          updateList();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Saliendo del grupo...',
        success: 'Saliste del grupo',
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
        Salir de un grupo
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
          Salir
        </Button>
      </Form>
    </>
  );
}

export default LeaveGroupForm;
