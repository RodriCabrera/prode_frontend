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

function LeaveGroupForm({ updater }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: {} });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      leaveGroup(values.name)
        .then(() => {
          console.log('OK');
          updater();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Saliendo del grupo...',
        success: `Saliste del grupo ${values.name}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">
        <Text size="1.3rem" align="center">
          Para salir del grupo ingrese el nombre del grupo
        </Text>
        <Input
          type="text"
          placeholder="Nombre del grupo"
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
  );
}

export default LeaveGroupForm;
