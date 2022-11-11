import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import GroupConfirm from "./GroupConfirm";
import { joinGroup, getGroupRules } from "../../../api/groups";
import { Button, Input, Label, Form } from "../../../common/common.styles";
import useToggleModal from "../../../hooks/useToggleModal";
import Modal from "../../../common/Modal/Modal";

function JoinGroupForm({ updateList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: {} });
  const [showForm, setShowForm] = useState(false);
  const [groupRules, setGroupRules] = useState(null);
  const { showModal, toggleModal } = useToggleModal();
  const { t } = useTranslation();

  const getGroupInformation = () => {
    setIsLoading(true);
    toast.promise(
      getGroupRules(values.groupName)
        .then(({ data }) => {
          setGroupRules(data);
        })
        .then(() => toggleModal())
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: `${t('groupSearching')}`,
        success: `${t('groupSearchSuccess')}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleJoinGroupSubmit = (e) => {
    e.preventDefault();
    if (!showModal) {
      return getGroupInformation();
    }
    setIsLoading(true);
    return toast.promise(
      joinGroup(values.groupName)
        .then(() => {
          updateList();
        })
        .finally(() => {
          setIsLoading(false);
          toggleModal();
        }),
      {
        pending: `${t('joiningGroup')}`,
        success: `${t('joinedGroup')}`,
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
        <Form onSubmit={handleJoinGroupSubmit}>
          <Label htmlFor="groupName">
            <Input
              type="text"
              placeholder={t('groupNamePH')}
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
            {t('groupSearch')}
          </Button>
          <Modal show={showModal && groupRules} toggle={toggleModal}>
            <GroupConfirm
              groupName={values.groupName}
              userGroupData={groupRules}
              confirmText={t('join')}
            />
          </Modal>
        </Form>
      )}
      <Button
        onClick={handleShowFormSwitch}
        grayscale={showForm}
        padding="10px"
      >
        {showForm ? t('hide') : t('joinGroup')}
      </Button>
    </>
  );
}

export default JoinGroupForm;
