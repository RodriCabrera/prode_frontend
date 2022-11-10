import React from 'react'
import { useNavigate } from "react-router-dom";

import { useIsMobile } from "../../../hooks/useIsMobile";
import { createExtraPredictions } from '../../../api/predictions';

import { GoBackButton } from "../../../common/GoBackButton/GoBackButton";
import {
    Text,
    CardContainer,
    Button,
    CardWrapper,
    Form
  } from "../../../common/common.styles";

export default function ExtraPredictions({ groupData }) {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <GoBackButton />

        <Text size="2.5rem" align="center" weight="800">
          {groupData?.name}
        </Text>
        <Text>
            Extra predictions
        </Text>
        <Form onSubmit={handleSubmit}>

        </Form>
    </CardWrapper>
    </CardContainer>
  )
}
