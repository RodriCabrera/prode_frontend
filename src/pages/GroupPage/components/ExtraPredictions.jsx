import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

import { useIsMobile } from "../../../hooks/useIsMobile";
import useCleanupController from "../../../hooks/useCleanupController";
import {
  createExtraPredictions,
  getExtraPredictions,
} from "../../../api/predictions";
import { parseDate } from "../../pagesHelpers";

import { GoBackButton } from "../../../common/GoBackButton/GoBackButton";
import {
  Text,
  TextGroup,
  CardContainer,
  Button,
  CardWrapper,
  Form,
  Input,
  Label,
} from "../../../common/common.styles";

const FieldInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export default function ExtraPredictions({ groupData }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: Object.fromEntries([
      ...groupData.extraPredictions.map((f) => [f.key, ""]),
    ]),
  });
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getExtraPredictions(groupData.id, signal).then((res) => {
      const predictions = res.data?.extraPredictions[0].predictions;
      Object.entries(predictions).forEach(([key, value]) => {
        setFieldValue(key, value);
      });
    });
    return cleanup;
  }, []);

  const checkDateIsValid = (date) => {
    return !(Date.parse(date) > Date.now());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(createExtraPredictions(groupData.id, values, signal), {
      pending: "enviando",
      success: "enviadas",
      error: {
        render({ data }) {
          return data.response.data.error;
        },
      },
    });
  };
  if (!groupData.extraPredictions) navigate(`/groups/${groupData.name}`);
  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <GoBackButton />
        <Text size="2.5rem" align="center" weight="800">
          {groupData?.name}
        </Text>
        <Text>Extra predictions</Text>
        <Form onSubmit={handleSubmit}>
          {groupData.extraPredictions.map((field) => (
            <FieldInput key={field.key}>
              <Label htmlFor={field.key.toString()}>{field.key}:</Label>
              <Text
                margin="0"
                style={{ fontStyle: "italic" }}
              >{`(${field.description})`}</Text>
              <Input
                name={field.key}
                value={values[field.key]}
                type="text"
                onChange={handleChange}
                disabled={checkDateIsValid(field.timeLimit)}
              />
              {checkDateIsValid(field.timeLimit) ? (
                <Text color="salmon">Expired</Text>
              ) : (
                <Text color="gold">
                  Complete before {parseDate(field.timeLimit)}
                </Text>
              )}
            </FieldInput>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      </CardWrapper>
    </CardContainer>
  );
}
