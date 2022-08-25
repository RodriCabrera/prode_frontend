import React from 'react';
import styled from '@emotion/styled';
import { AiFillCopy } from 'react-icons/ai';
import {
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';
import { toast } from 'react-toastify';
import { Text } from '../../../common/common.styles';

const ShareButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CopyLinkButton = styled.button`
  background-color: darkorange;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0.15rem;
`;

export default function GroupInvite() {
  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    return toast.info('Link copiado!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };
  return (
    <>
      <Text align="center">Invita a nuevos miembros!</Text>
      <ShareButtons>
        <CopyLinkButton onClick={copyShareLink}>
          <AiFillCopy size={28} />
        </CopyLinkButton>
        <EmailShareButton
          url={window.location.href}
          subject="Te invito a unirte a mi grupo de Prode"
          body="Podés unirte ingresando al siguiente link: "
        >
          <EmailIcon size={36} round />
        </EmailShareButton>
        <WhatsappShareButton
          url={window.location.href}
          title="Te invito a unirte a mi grupo de Prode: "
        >
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
        <TelegramShareButton
          url={window.location.href}
          title="Te invito a unirte a mi grupo de Prode: "
        >
          <TelegramIcon size={36} round />
        </TelegramShareButton>
      </ShareButtons>
    </>
  );
}
