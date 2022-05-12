import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { getGroupScores, getUserGroups } from '../../api/groups';
import { Button, Form, Label } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

function GroupScoresForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const { values, handleChange } = useFormik({ initialValues: {} });

  // TODO : Ver como le pasamos los nombres de los grupos. Mas que nada diseño.

  const getGroupList = () => {
    getUserGroups()
      .then(({ data }) => {
        setGroupList(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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

  useEffect(() => {
    getGroupList();
  }, []);

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
          {groupList.map((group) => (
            <option value={group.name}>{group.name}</option>
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
