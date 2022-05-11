import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { getGroupScores } from '../../api/groups';
import { AuthContext } from '../../common/AuthProvider';
import { Button, Form, Label } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

function GroupScoresForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { values, handleChange } = useFormik({ initialValues: {} });
  const userContext = useContext(AuthContext);

  // TODO : Ver como le pasamos los nombres de los grupos. Mas que nada diseño.

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getGroupScores(values.groupName)
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
  console.log('SCORES: ', scores);
  return (
    <Form onSubmit={handleSubmit}>
      Seleccionar grupo:
      <Label htmlFor="groupName">
        <select
          value={values.groupName}
          name="groupName"
          onChange={handleChange}
        >
          <option defaultChecked>Seleccione un grupo</option>
          {userContext.user.groups.map((group) => (
            <option value={group}>{group}</option>
          ))}
        </select>
      </Label>
      <Button type="submit">Ver scores</Button>
      {isLoading && <Spinner />}
      {error}
      {/* <Text>{scores}</Text> */}
    </Form>
  );
}

export default GroupScoresForm;
