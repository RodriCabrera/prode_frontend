import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useFlags } from "flagsmith/react"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import GroupConfirm from "./GroupConfirm";
import { createGroup } from "../../../api/groups";
import ScoringInputs from "./ScoringInputs";
import useToggleModal from "../../../hooks/useToggleModal";

import Modal from "../../../common/Modal/Modal";
import {
  Button,
  Input,
  Label,
  Form,
  TextareaInput,
  Select,
  Text,
  TextGroup
} from "../../../common/common.styles";
import { groupsSchema } from "../../../validationSchemas/groups";

function CreateGroupForm({ updateList }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const { values, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      manifesto: "",
      scoringFull: 3,
      scoringWinner: 1,
      scoringNone: 0,
      timeLimit: 0,
      limitByPhase: "false"
    },
    validationSchema: groupsSchema.create,
  });
  const flags = useFlags(["show_admin_functions"])
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    toast.promise(
      createGroup({
        name: values.name.trim().toUpperCase(),
        rules: {
          manifesto: values.manifesto,
          scoring: {
            FULL: values.scoringFull,
            WINNER: values.scoringWinner,
            NONE: values.scoringNone,
          },
          timeLimit: values.timeLimit,
          limitByPhase: values.limitByPhase === "true"
        },
      })
        .then(() => {
          updateList();
          navigate(`/groups/${values.name.trim().toUpperCase()}`);
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: `${t('creatingGroup')}`,
        success: `${t('groupCreated')}`,
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
              placeholder={t('groupNamePH')}
              name="name"
              required
              value={values.name}
              onChange={handleChange}
              showUppercase
              maxLength={20}
              borderError={errors.name}
            />
            {errors.name && (
              <Text
                size="0.85rem"
                color="red"
                align="left"
                margin="-0.2rem 0.65rem"
              >
                *{errors.name}
              </Text>
            )}
          </Label>
          <Label htmlFor="manifesto">
            <TextareaInput
              type="text"
              placeholder={
                t('groupManifestPH1') +
                "\n\n" +
                t('groupManifestPH2')
              }
              name="manifesto"
              required
              value={values.manifesto}
              onChange={handleChange}
              rows="10"
              maxLength="1024"
              borderError={errors.manifesto}
            />
            {errors.manifesto && (
              <Text
                size="0.85rem"
                color="red"
                align="left"
                margin="-0.2rem 0.65rem"
              >
                *{errors.manifesto}
              </Text>
            )}
          </Label>
          <ScoringInputs values={values} handleChange={handleChange} />
          <Text size=".8rem" align="center">
            {t('timeLimitTitle')}
          </Text>
          {flags.show_admin_functions.enabled && 
          <TextGroup align="center" margin="0">
            <Label htmlFor="DontLimitByPhase">
                <TextGroup margin="0">
                    <Text>{t('byMatch')}</Text>
                    <Input type="radio" name="limitByPhase" id="DontLimitByPhase" 
                        value={false} onChange={handleChange} checked={values.limitByPhase==="false"} />
                </TextGroup>
            </Label>
            <Label htmlFor="DoLimitByPhase">
                <TextGroup margin="0">
                    <Text>{t('byStage')}</Text>
                    <Input type="radio" name="limitByPhase" id="DoLimitByPhase" 
                        value={true} onChange={handleChange} checked={values.limitByPhase==="true"} />
                </TextGroup>
            </Label>
          </TextGroup>}
          <Label htmlFor="timeLimit">
            <Select
              value={values.timeLimit}
              name="timeLimit"
              onChange={handleChange}
            >
              <option value={0} defaultChecked>
                {values.limitByPhase === "true" ? 
                    t('timeLimitOptionStage0') : t('timeLimitOptionMatch0') }
              </option>
              <option value={1000 * 60 * 60 * 1}>
                {values.limitByPhase === "true" ? 
                    t('timeLimitOptionStage1') : t('timeLimitOptionMatch1') }
              </option>
              <option value={1000 * 60 * 60 * 12}>
                {values.limitByPhase === "true" ? 
                    t('timeLimitOptionStage2') : t('timeLimitOptionMatch2') }
              </option>
              <option value={1000 * 60 * 60 * 24}>
                {values.limitByPhase === "true" ? 
                    t('timeLimitOptionStage3') : t('timeLimitOptionMatch3') }
              </option>
            </Select>
          </Label>
          <Button
            type="button"
            disabled={isLoading || !isEmpty(errors) || isEmpty(values.name)}
            onClick={toggleModal}
          >
            {t('createGroup')}
          </Button>
          <Modal show={showModal} toggle={toggleModal}>
            <GroupConfirm
              groupName={values.name.trim().toUpperCase()}
              userGroupData={{
                manifesto: values.manifesto,
                scoring: {
                  FULL: values.scoringFull,
                  WINNER: values.scoringWinner,
                  NONE: values.scoringNone,
                },
                timeLimit: values.timeLimit,
                limitByPhase: values.limitByPhase === "true"
              }}
              confirmText={t('createGroup')}
            />
          </Modal>
        </Form>
      )}
      <Button
        onClick={handleShowFormSwitch}
        grayscale={showForm}
        padding="10px"
      >
        {showForm ? t('hide') : t('createNewGroup')}
      </Button>
    </>
  );
}

export default CreateGroupForm;
