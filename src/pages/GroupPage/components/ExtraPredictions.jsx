import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { useIsMobile } from "../../../hooks/useIsMobile";
import useCleanupController from "../../../hooks/useCleanupController";
import {
  createExtraPredictions,
  getExtraPredictions,
} from "../../../api/predictions";
import { parseDate } from "../../pagesHelpers";

import { BallLoader } from "../../../common/Spinner/BallLoader";
import { GoBackButton } from "../../../common/GoBackButton/GoBackButton";
import {
  Text,
  CardContainer,
  Button,
  CardWrapper,
  Form,
  Input,
  Label,
} from "../../../common/common.styles";

const FieldInput = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #404040;
  }
  & > p {
    align-self: flex-end;
    margin-right: 1rem;
    font-size: 0.9rem;
  }
`;

const FieldLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  gap: 1rem;
  & input {
    font-size: 1rem;
    flex-grow: 1;
  }
`;

export default function ExtraPredictions({ groupData }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: Object.fromEntries([
      ...groupData.extraPredictions.map((f) => [f.key, ""]),
    ]),
  });
  const [signal, cleanup] = useCleanupController();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    getExtraPredictions(groupData.id, signal)
      .then((res) => {
        const predictions = res.data?.extraPredictions[0].predictions;
        Object.entries(predictions).forEach(([key, value]) => {
          setFieldValue(key, value);
        });
      })
      .finally(() => setLoading(false));
    return cleanup;
  }, []);

  const checkDateIsValid = (date) => {
    return !(Date.parse(date) > Date.now());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      createExtraPredictions(groupData.id, values, signal).finally(() =>
        navigate(-1)
      ),
      {
        pending: `${t("predictionsSending.plural")}`,
        success: `${t("predictionsSent.plural")}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };
  if (!groupData.extraPredictions) navigate(`/groups/${groupData.name}`);
  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <GoBackButton />
        <Text size="2.5rem" align="center" weight="800">
          {groupData?.name}
        </Text>
        <Text
          align="center"
          size="2rem"
          margin={isMobile ? "1rem 0" : "1rem 0 2rem"}
        >
          {t("extraPredictions")}
        </Text>
        {loading ? (
          <BallLoader />
        ) : (
          <Form
            onSubmit={handleSubmit}
            style={{ gap: "2rem", padding: isMobile ? "0" : "0 15%" }}
          >
            {groupData.extraPredictions.map((field) => (
              <FieldInput key={field.key} isMobile={isMobile}>
                <FieldLine>
                  <Label htmlFor={field.key.toString()}>{field.key}:</Label>
                  <Text
                    margin="0"
                    style={{ fontStyle: "italic", flexGrow: "1" }}
                  >
                    {field.description}
                  </Text>
                </FieldLine>
                <FieldLine>
                  <Input
                    name={field.key}
                    value={values[field.key]}
                    type="text"
                    onChange={handleChange}
                    disabled={checkDateIsValid(field.timeLimit)}
                    maxLength={50}
                  />
                  <Text>({field.score || 0} pts)</Text>
                </FieldLine>
                {checkDateIsValid(field.timeLimit) ? (
                  <Text color="salmon">{t("expired")}</Text>
                ) : (
                  <Text color={values[field.key] ? "default" : "gold"}>
                    {values[field.key]
                      ? t("canEditUntil")
                      : t("completeBefore")}{" "}
                    {parseDate(field.timeLimit)}
                  </Text>
                )}
              </FieldInput>
            ))}
            <Button type="submit">{t("send")}</Button>
          </Form>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
