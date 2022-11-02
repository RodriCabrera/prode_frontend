import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BsFillCameraFill } from "react-icons/bs";

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
  const userContext = useContext(AuthContext);
  const { values, handleChange, errors, setFieldValue, dirty } = useFormik({
    initialValues: {
      name: userContext?.user?.name,
      avatar: userContext?.user?.avatar,
    },
    validationSchema: profileSchema.edit,
  });
  const { showModal, toggleModal } = useToggleModal();
  const [customAvatarLink, setCustomAvatarLink] = useState("");

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
        .then(() => {
          setTimeout(userContext.updateAuth, 1000);
        })
        .finally(() => {
          toggleEditMode();
        }),
      {
        pending: "Enviando cambios",
        success: "Perfil actualizado",
        error: {
          render({ data }) {
            return data?.response.data?.error;
          },
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <UserNameContainer>
        <BigAvatarWrapper>
          <AvatarEditWrapper onClick={toggleModal}>
            <AvatarOverlay>
              <BsFillCameraFill size="3rem" />
            </AvatarOverlay>
            <UserMiniAvatar
              name={userContext.user?.name}
              avatar={values.avatar}
              emptySize="10rem"
            />
          </AvatarEditWrapper>
        </BigAvatarWrapper>
        {isMobile && <Info>Haz click en el avatar para elegir otro</Info>}
      </UserNameContainer>
      <Label htmlFor="name">
        <Input
          type="string"
          placeholder="Nombre de usuario"
          name="name"
          value={values.name}
          maxLength={20}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.name && <Info>{errors.name}</Info>}
      </Label>
      <Button type="submit" disabled={!dirty || !isEmpty(errors)}>
        Confirmar
      </Button>
      <Button type="reset" grayscale onClick={toggleEditMode}>
        Cancelar
      </Button>
      <Modal show={showModal} toggle={toggleModal}>
        <BigAvatarWrapper>
          <UserMiniAvatar avatar={customAvatarLink || values.avatar} />
        </BigAvatarWrapper>
        <Text size="2rem" align="center">
          Introduce un link a tu imagen
        </Text>
        <Input
          type="url"
          value={customAvatarLink}
          onChange={(e) => setCustomAvatarLink(e.target.value)}
        />
        <AvatarList handleNewAvatar={handleNewAvatar} />
        <Button
          type="button"
          onClick={() => handleNewAvatar(customAvatarLink)}
          disabled={!customAvatarLink}
        >
          Seleccionar
        </Button>
      </Modal>
    </Form>
  );
}

export default ProfileEdit;
