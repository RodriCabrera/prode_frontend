import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { getGroupScores, getUserGroups } from '../../api/groups';
import { Form, Label, Select } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

// TODO Implementar Toast promise

function GroupScoresForm({ setScores }) {
  const [isLoading, setIsLoading] = useState(false);
  // const [scores, setScores] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const { values, handleChange } = useFormik({
    initialValues: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getGroupScores(e.target.value)
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

  useEffect(() => {
    setIsLoading(true);
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
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      Seleccionar grupo:
      <Label htmlFor="groupName">
        <Select
          value={values.groupName}
          name="groupName"
          onChange={(e) => {
            handleChange(e.target.value);
            handleSubmit(e);
          }}
        >
          <option defaultChecked>
            {isLoading ? 'Cargando grupos...' : 'Selecciona un grupo'}
          </option>
          {groupList.map((group) => (
            <option key={group.name} value={group.name}>
              {group.name}
            </option>
          ))}
        </Select>
      </Label>
      {/* <Button type="submit">Ver scores</Button> */}
      {isLoading && <Spinner />}
      {error}
    </Form>
  );
}

export default GroupScoresForm;
