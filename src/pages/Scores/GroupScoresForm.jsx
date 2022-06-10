import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getGroupScores, getUserGroups } from '../../api/groups';
import { Form, Label, Select } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

// TODO Implementar Toast promise

function GroupScoresForm({ setScores }) {
  const [isLoading, setIsLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const { values, handleChange } = useFormik({
    initialValues: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      getGroupScores(e.target.value)
        .then((res) => {
          setScores(res);
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Obteniendo puntajes...',
        success: 'Puntajes obtenidos.',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const loadUserGroups = () => {
    setIsLoading(true);
    toast.promise(
      getUserGroups()
        .then(({ data }) => {
          if (data.length === 0)
            throw new Error('No perteneces a ningún grupo.');
          setGroupList(data);
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Obteniendo grupos...',
        success: 'Grupos obtenidos.',
        error: {
          render({ data }) {
            return data.message || data.response.data.error;
          },
        },
      }
    );
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
        >
          <option defaultChecked disabled={groupList.length === 0}>
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

export default GroupScoresForm;
