import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { leaveGroup, deleteGroup } from "../../../api/groups";
import {
  Button,
  Input,
  Label,
  Text,
  Form,
} from "../../../common/common.styles";

function LeaveGroupForm({ updater, toDelete }) {
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormik({ initialValues: { name: "" } });
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      leaveGroup(values.name)
        .then(() => {
          updater();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: t('groupLeaving'),
        success: `${t('groupLeft')} ${values.name}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleDelete = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      deleteGroup(toDelete)
        .then(() => {
          updater();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: t('groupDeleteing'),
        success: `${t('groupDeleted')} ${values.name}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  return (
    <Form onSubmit={toDelete ? handleDelete : handleSubmit}>
      {toDelete ? (
        <>
          <Text align="center" color="salmon" size="1.3rem">
            {t('groupDeleteConfirmMsg1')}
          </Text>
          <Text
            align="center"
            color="red"
            size="1.8rem"
            margin="1rem 0rem 0rem 0rem"
            >
            {t('groupDeleteConfirmMsg2')}
          </Text>
        </>
      ) : (
        <>
          <Text align="center" color="salmon" size="1.3rem">
            {t('groupLeaveConfirmMsg1')}
          </Text>
          <Text align="center" color="salmon">
            {t('groupLeaveConfirmMsg2')}
          </Text>
        </>
      )}
      <br />
      <Label htmlFor="name">
        <Text size="1.3rem" align="center">
          {t('groupCheckConfirm')}
        </Text>
        <Input
          type="text"
          placeholder={t('groupNamePH')}
          name="name"
          required
          value={values.name}
          onChange={handleChange}
          showUppercase
        />
      </Label>
      <Button
        type="submit"
        disabled={isLoading || values.name?.toUpperCase() !== name}
      >
        {toDelete ? t('deleteGroup') : t('exit')}
      </Button>
    </Form>
  );
}

export default LeaveGroupForm;
