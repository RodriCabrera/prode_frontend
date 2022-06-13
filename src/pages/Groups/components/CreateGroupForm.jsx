import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createGroup } from '../../../api/groups';
import { Button, Input, Label, Form } from '../../../common/common.styles';
import { groupsSchema } from '../../../validationSchemas/groups';

function CreateGroupForm({ updateList }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { values, handleChange, errors } = useFormik({
    initialValues: {},
    validationSchema: groupsSchema.create,
  });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    toast.promise(
      createGroup({ name: values.name.toUpperCase() })
        .then(() => {
          updateList();
          navigate(`/groups/${values.name.toUpperCase()}`);
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Creando grupo...',
        success: 'Grupo creado con éxito. Redirigiendo...',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };
  const handleShowFormSwitch = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">
            <Input
              type="text"
              placeholder="Nombre del nuevo grupo"
              name="name"
              required
              value={values.name}
              onChange={handleChange}
              showUppercase
            />
          </Label>
          <Button type="submit" disabled={isLoading || !isEmpty(errors)}>
            {!isEmpty(errors) ? errors.name : 'Crear grupo'}
          </Button>
        </Form>
      )}
      <Button
        onClick={handleShowFormSwitch}
        grayscale={showForm}
        padding="10px"
      >
        {showForm ? 'Ocultar' : 'Crear un nuevo grupo'}
      </Button>
    </>
  );
}

export default CreateGroupForm;
