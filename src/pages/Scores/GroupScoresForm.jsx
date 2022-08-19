import { useFormik } from 'formik';
import { useState } from 'react';
import { getGroupScores } from '../../api/groups';
import { Form, Label, Select } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

export function GroupScoresForm({ setScores, userGroupList }) {
  const [isLoading, setIsLoading] = useState(false);
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
          disabled={userGroupList?.length === 0}
        >
          <option value="" defaultChecked>
            {isLoading ? 'Cargando grupos...' : 'Selecciona un grupo'}
          </option>
          {userGroupList?.map((group) => (
            <option key={group.name} value={group.name}>
              {group.name}
            </option>
          ))}
        </Select>
      </Label>
      {isLoading && <Spinner />}
    </Form>
  );
}
