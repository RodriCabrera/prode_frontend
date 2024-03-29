import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BsFillCameraFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

import { editProfile } from "../../../api/profiles";
import AvatarList from "./AvatarListNew";
import { UserMiniAvatar } from "../../../common/UserMiniAvatar/UserMiniAvatar";
import useToggleModal from "../../../hooks/useToggleModal";
import { AuthContext } from "../../../common/AuthProvider";
import { profileSchema } from "../../../validationSchemas/auth";

import Modal from "../../../common/Modal/Modal";
import { Info } from "../../../common/Info/Info";
import {
  Form,
  Label,
  Input,
  Text,
  Button,
} from "../../../common/common.styles";
import {
  AvatarEditWrapper,
  AvatarOverlay,
  BigAvatarWrapper,
  UserNameContainer,
} from "../profile.styles";
import { isEmpty } from "lodash";

function ProfileEdit({ toggleEditMode, isMobile }) {
  const [customAvatarLink, setCustomAvatarLink] = useState("");

  const userContext = useContext(AuthContext);

  const { t } = useTranslation();
  const { showModal, toggleModal } = useToggleModal();
  const { values, handleChange, errors, setFieldValue, dirty } = useFormik({
    initialValues: {
      name: userContext?.user?.name,
      avatar: userContext?.user?.avatar,
    },
    validationSchema: profileSchema.edit,
  });

  const handleNewAvatar = (value) => {
    setFieldValue("avatar", value);
    setCustomAvatarLink("");
    toggleModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      editProfile({
        name: values.name,
        avatar: values.avatar,
      })
        .then(() => setTimeout(userContext.updateAuth, 1000))
        .finally(() => toggleEditMode()),
      {
        pending: `${t("sendingChanges")}`,
        success: `${t("profileUpdated")}`,
        error: {
          render({ data }) {
            return data?.response.data?.error;
          },
        },
      }
    );
  };
  const customLinkError = customAvatarLink.includes("data:");
  const isDisabled = !customAvatarLink || customLinkError;

  return (
    <Form onSubmit={handleSubmit}>
      <UserNameContainer>
        <BigAvatarWrapper>
          <AvatarEditWrapper onClick={toggleModal}>
            <AvatarOverlay className="overlay">
              <BsFillCameraFill size="3rem" />
            </AvatarOverlay>
            <UserMiniAvatar
              name={userContext.user?.name}
              avatar={values.avatar}
              emptySize="15rem"
            />
          </AvatarEditWrapper>
        </BigAvatarWrapper>
        <Info>{t("clickAvatarToChoose")}</Info>
      </UserNameContainer>
      <Label htmlFor="name">
        <Input
          type="string"
          placeholder={t("username")}
          name="name"
          value={values.name}
          maxLength={20}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.name && <Info>{t(errors.name)}</Info>}
      </Label>
      <Button type="submit" disabled={!dirty || !isEmpty(errors)}>
        {t("confirm")}
      </Button>
      <Button type="reset" grayscale onClick={toggleEditMode}>
        {t("cancel")}
      </Button>

      <Modal show={showModal} toggle={toggleModal}>
        <BigAvatarWrapper>
          <UserMiniAvatar
            avatar={customAvatarLink || values.avatar}
            emptySize="15rem"
          />
        </BigAvatarWrapper>
        <Text size="1.5rem" align="left">
          {t("insertImageLink")}
        </Text>
        <Info>{t("customImageInfo")}</Info>
        <Input
          type="url"
          value={customAvatarLink}
          onChange={(e) => setCustomAvatarLink(e.target.value)}
          placeholder="https://brandemia.org/contenido/subidas/2012/07/the-rolling-stones-logo.webp"
        />
        {customLinkError && <Text color="tomato">{t("customImageError")}</Text>}
        <AvatarList handleNewAvatar={handleNewAvatar} />
        <Button
          type="button"
          onClick={() => handleNewAvatar(customAvatarLink)}
          disabled={isDisabled}
        >
          {t("select")}
        </Button>
      </Modal>
    </Form>
  );
}

export default ProfileEdit;
