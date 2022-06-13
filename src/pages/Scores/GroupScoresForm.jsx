import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { getGroupScores, getUserGroups } from '../../api/groups';
import { Form, Label, Select } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

export function GroupScoresForm({ setScores }) {
  const [isLoading, setIsLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const { values, handleChange } = useFormik({
    initialValues: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setScores(undefined);
    if (!e.target.value) return;
    setIsLoading(true);
    getGroupScores(e.target.value)
      .then((res) => {
        setScores(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadUserGroups = () => {
    setIsLoading(true);
    getUserGroups()
      .then(({ data }) => {
        if (data.length === 0) throw new Error('No perteneces a ningún grupo.');
        setGroupList(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUserGroups();
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
          disabled={groupList.length === 0}
        >
          <option value="" defaultChecked>
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
    </Form>
  );
}
