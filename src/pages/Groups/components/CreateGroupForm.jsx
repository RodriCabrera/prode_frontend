import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GroupConfirm from './GroupConfirm';
import { createGroup } from '../../../api/groups';
import ScoringInputs from './ScoringInputs';
import useToggleModal from '../../../hooks/useToggleModal';
import Modal from '../../../common/Modal/Modal';
import {
  Button,
  Input,
  Label,
  Form,
  TextareaInput,
  Select,
} from '../../../common/common.styles';
import { groupsSchema } from '../../../validationSchemas/groups';

function CreateGroupForm({ updateList }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const { values, handleChange, errors } = useFormik({
    initialValues: {
      name: '',
      manifesto: '',
      scoringFull: 3,
      scoringWinner: 1,
      scoringNone: 0,
    },
    validationSchema: groupsSchema.create,
  });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    toast.promise(
      createGroup({
        name: values.name.toUpperCase(),
        rules: {
          manifesto: values.manifesto,
          scoring: {
            FULL: values.scoringFull,
            WINNER: values.scoringWinner,
            NONE: values.scoringNone,
          },
          timeLimit: values.timeLimit,
        },
      })
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
          <Label htmlFor="manifesto">
            <TextareaInput
              type="text"
              placeholder="Reglamento (los miembros deberán aceptar estos términos al ingresar)"
              name="manifesto"
              required
              value={values.manifesto}
              onChange={handleChange}
              rows="10"
              maxLength="1024"
            />
          </Label>
          <ScoringInputs values={values} handleChange={handleChange} />
          <Label htmlFor="timeLimit">
            ¿Hasta cuando se podrán realizar las predicciones?
            <Select
              value={values.timeLimit}
              name="timeLimit"
              onChange={handleChange}
            >
              <option value={0} defaultChecked>
                Al empezar el partido
              </option>
              <option value={1000 * 60 * 60 * 1}>
                Una hora antes del partido
              </option>
              <option value={1000 * 60 * 60 * 12}>
                Doce horas antes del partido
              </option>
              <option value={1000 * 60 * 60 * 24}>
                Un día antes del partido
              </option>
              <option value={1000 * 60 * 60 * 24 * 7}>
                Una semana antes del partido
              </option>
            </Select>
          </Label>
          <Button
            type="button"
            disabled={isLoading || !isEmpty(errors) || isEmpty(values.name)}
            onClick={toggleModal}
          >
            {!isEmpty(errors) ? errors.name || errors.manifesto : 'Crear grupo'}
          </Button>
          <Modal show={showModal} toggle={toggleModal}>
            <GroupConfirm
              groupName={values.name.toUpperCase()}
              userGroupData={{
                manifesto: values.manifesto,
                scoring: {
                  FULL: values.scoringFull,
                  WINNER: values.scoringWinner,
                  NONE: values.scoringNone,
                },
                timeLimit: values.timeLimit,
              }}
              confirmText="Crear grupo"
            />
          </Modal>
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
