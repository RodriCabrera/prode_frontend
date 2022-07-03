import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import GroupConfirm from './GroupConfirm';
import { joinGroup, getGroupRules } from '../../../api/groups';
import { Button, Input, Label, Form } from '../../../common/common.styles';
import Modal from '../../../common/Modal/Modal';

function JoinGroupForm({ updateList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: {} });
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [groupRules, setGroupRules] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal((value) => !value);
    setIsLoading(true);

    toast.promise(
      joinGroup(values.groupName)
        .then(() => {
          updateList();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Uniendote al grupo...',
        success: 'Te uniste al grupo',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const getGroupInformation = () => {
    setIsLoading(true);
    toast.promise(
      getGroupRules(values.groupName)
        .then(({ data }) => {
          setGroupRules(data);
        })
        .then(() => setShowModal(true))
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Buscando grupo...',
        success: 'Grupo encontrado',
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

  const handleGroupSearch = () => {
    getGroupInformation();
  };

  return (
    <>
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="groupName">
            <Input
              type="text"
              placeholder="Nombre del grupo"
              name="groupName"
              required
              value={values.groupName}
              onChange={handleChange}
              showUppercase
            />
          </Label>
          <Button
            type="button"
            onClick={handleGroupSearch}
            disabled={isLoading}
          >
            Buscar grupo
          </Button>
          <Modal show={showModal && groupRules}>
            <GroupConfirm
              groupName={values.groupName}
              userGroupData={groupRules}
              confirmText="Aceptar"
            />
          </Modal>
        </Form>
      )}
      <Button
        onClick={handleShowFormSwitch}
        grayscale={showForm}
        padding="10px"
      >
        {showForm ? 'Ocultar' : 'Unirse a un Grupo'}
      </Button>
    </>
  );
}

export default JoinGroupForm;
