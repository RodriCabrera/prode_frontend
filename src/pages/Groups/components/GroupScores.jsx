import { useFormik } from 'formik';
import React, { useState } from 'react';
import { getGroupScores } from '../../../api/groups';
import {
  Button,
  Form,
  Input,
  Label,
  Text,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function GroupScores() {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { values, handleChange } = useFormik({ initialValues: {} });

  // TODO : Ver como le pasamos los nombres de los grupos.

  // ! TODO: Este getGroupScores me esta devolviendo 401 UNAUTHORIZED.
  // No deberia ser un post? Si lleva payload groupName?

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getGroupScores(values)
      .then((res) => {
        console.log(res);
        setScores(res);
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Text size="2rem" align="center">
        Ver puntajes de un grupo
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="groupName">
          Nombre del grupo:
          <Input // TODO: Esto supongo que deberia ser con un select cuyas opciones vendrian mapeadas del usercontext.
            type="text"
            placeholder="Nombre del grupo"
            name="groupName"
            required
            value={values.groupName}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Ver scores</Button>
        {isLoading && <Spinner />}
        {error}
        <Text>{scores}</Text>
      </Form>
    </div>
  );
}

export default GroupScores;
