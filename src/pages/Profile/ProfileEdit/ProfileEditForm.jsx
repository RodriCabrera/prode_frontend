import { useState } from "react";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import { editProfile } from "../../../api/profiles";
import Modal from "../../../common/Modal/Modal";
import useToggleModal from "../../../hooks/useToggleModal";
import { UserMiniAvatar } from "../../../common/UserMiniAvatar/UserMiniAvatar";
import { Spinner } from "../../../common/Spinner/Spinner";
import AvatarList from "./AvatarList";

import { BigAvatarWrapper, AvatarContainer } from "../profile.styles";
import {
  Button,
  Form,
  Input,
  Label,
  Text,
} from "../../../common/common.styles";

export function ProfileEditForm({ profile, updateProfile }) {
  const [userName, setUserName] = useState(profile?.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar || "");

  const { showModal, toggleModal } = useToggleModal();
  const { t } = useTranslation();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const isNumberAndLetters = /[^A-Za-z0-9]/.test(userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (userName === profile.name && selectedAvatar === profile.avatar) ||
      isNumberAndLetters
    )
      return;
    if (!showModal) return toggleModal();
    setIsLoading(true);
    toast.promise(
      editProfile({
        name: userName || profile.name,
        avatar: selectedAvatar || profile.avatar,
      })
        .then(() => {
          setTimeout(updateProfile, 1000);
        })
        .finally(() => {
          toggleModal();
          setUserName(profile.name);
          setIsLoading(false);
          setIsEditingEnabled(false);
        }),
      {
        pending: `${t('sendingChanges')}`,
        success: `${t('profileUpdated')}`,
        error: {
          render({ data }) {
            return data?.response.data?.error;
          },
        },
      }
    );
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  if (isLoading || isEmpty(profile)) return <Spinner />;

  const isDisabled = () => {
    return (
      (userName === profile.name && selectedAvatar === profile.avatar) ||
      isNumberAndLetters
    );
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      {!isEditingEnabled && (
        <Button onClick={() => setIsEditingEnabled(!isEditingEnabled)}>
          {t("editProfile")}
        </Button>
      )}
      {isEditingEnabled && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">
            <Input
              type="string"
              placeholder="Nombre de usuario"
              name="name"
              disabled={!isEditingEnabled}
              value={userName}
              maxLength={20}
              onChange={handleNameChange}
            />
          </Label>
          <Button type="button" onClick={toggleModal} disabled={isDisabled()}>
            {isNumberAndLetters ? "Solo letras y números" : t('profileUpdate')}
          </Button>
          <Modal show={showModal} toggle={toggleModal}>
            <Text size="1.2rem" align="center" withBottomBorder>
              {t("yourNewProfile")}
            </Text>
            <br />
            <Text size="2rem" align="center">
              {userName || profile.name}
            </Text>
            <br />
            <AvatarContainer>
              <BigAvatarWrapper>
                <UserMiniAvatar
                  avatar={selectedAvatar || profile.avatar}
                  name={userName || profile.name}
                />
              </BigAvatarWrapper>
            </AvatarContainer>
            <br />
            <Button type="submit">{t("confirm")}</Button>
          </Modal>
        </Form>
      )}
      {isEditingEnabled && (
        <AvatarList
          handleAvatarClick={handleAvatarClick}
          selectedAvatar={selectedAvatar}
        />
      )}
    </>
  );
}
