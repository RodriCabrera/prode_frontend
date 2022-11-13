import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { ImCancelCircle, ImPlus } from "react-icons/im";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { editGroup } from "api/groups";
import ScoringInputs from "../../Groups/components/ScoringInputs";
import { parseInputDate } from "../../pagesHelpers";
import { Info } from "common/Info/Info";
import { groupsSchema } from "validationSchemas/groups";

import {
  Button,
  Form,
  Input,
  Label,
  Select,
  Text,
  TextareaInput,
  TextGroup,
} from "common/common.styles";
import { useIsMobile } from "../../../hooks/useIsMobile";

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  & label {
    font-size: 0.8rem;
    & input {
      font-size: 1rem;
    }
  }
  & .icon {
    cursor: pointer;
    margin: 1rem 0 0 0.5rem;
  }
  & :nth-child(2) {
    flex-grow: 1;
  }
`;

const StyledButton = styled(Button)`
  background: black;
  color: yellowgreen;
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

export default function AdminPanel({ groupData, updater }) {
  const { values, handleChange, errors, setFieldValue } = useFormik({
    initialValues: {
      name: groupData.name,
      manifesto: groupData.rules.manifesto,
      scoringFull: groupData.rules.scoring.FULL,
      scoringWinner: groupData.rules.scoring.WINNER,
      scoringNone: groupData.rules.scoring.NONE,
      timeLimit: groupData.rules.timeLimit,
      limitByPhase: groupData.rules.limitByPhase ? "true" : "false",
      extraPredictions: groupData.extraPredictions || [],
    },
    validationSchema: groupsSchema.edit,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      editGroup(groupData.id, {
        name: values.name.trim().toUpperCase(),
        rules: {
          manifesto: values.manifesto,
          scoring: {
            FULL: values.scoringFull,
            WINNER: values.scoringWinner,
            NONE: values.scoringNone,
          },
          timeLimit: values.timeLimit,
          limitByPhase: values.limitByPhase === "true",
        },
        extraPredictions: values.extraPredictions,
      }).then((res) => {
        if (res.status === 200) {
          navigate(`/groups/${values.name}`);
          updater(values.name);
        }
      }),
      {
        pending: `${t("groupEditing")}`,
        success: `${t("groupEdited")}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const isEditAvailable = Date.now() < Date.parse("11-15-2022 13:00 GMT-0300");

  const handleNewCustomPredictionField = () => {
    setFieldValue("extraPredictions", [
      ...values.extraPredictions,
      {
        key: "",
        description: "",
        score: "5",
        timeLimit: "11-20-2022 13:00 GMT-0300",
      },
    ]);
  };

  const handleRemoveCustomEntry = (key) => {
    setFieldValue(
      "extraPredictions",
      values.extraPredictions.filter((field) => field.key !== key)
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Info>
        {isEditAvailable ? t("adminEditTimeInfo1") : t("adminEditTimeInfo2")}
      </Info>
      <Label htmlFor="name">
        {t("groupNamePH")}
        <Input
          type="text"
          placeholder={t("groupNamePH")}
          name="name"
          required
          value={values.name}
          onChange={handleChange}
          showUppercase
          maxLength={20}
          borderError={errors.name}
          disabled={!isEditAvailable}
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
        {t("rules")}
        <TextareaInput
          type="text"
          placeholder={t("groupManifestPH1") + "\n\n" + t("groupManifestPH2")}
          name="manifesto"
          required
          value={values.manifesto}
          onChange={handleChange}
          rows="4"
          maxLength="1024"
          borderError={errors.manifesto}
          disabled={!isEditAvailable}
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
      <ScoringInputs
        values={values}
        handleChange={handleChange}
        disable={!isEditAvailable}
      />
      <Text align="center" margin="1.2rem 0rem 0.2rem">
        {t("timeLimitTitle")}
      </Text>
      <TextGroup align="center" margin=".2rem">
        <Label htmlFor="DontLimitByPhase">
          <TextGroup margin="0.2rem">
            <Text>{t("byMatch")}</Text>
            <Input
              type="radio"
              name="limitByPhase"
              id="DontLimitByPhase"
              value={false}
              onChange={handleChange}
              checked={values.limitByPhase === "false"}
              disabled={!isEditAvailable}
            />
          </TextGroup>
        </Label>
        <Label htmlFor="DoLimitByPhase">
          <TextGroup margin="0.2rem">
            <Text>{t("byStage")}</Text>
            <Input
              type="radio"
              name="limitByPhase"
              id="DoLimitByPhase"
              value={true}
              onChange={handleChange}
              checked={values.limitByPhase === "true"}
              disabled={!isEditAvailable}
            />
          </TextGroup>
        </Label>
      </TextGroup>
      <Info>
        {values.limitByPhase === "false"
          ? t("byMatchDetail")
          : t("byStageDetail")}
      </Info>
      <Label htmlFor="timeLimit">
        <Select
          value={values.timeLimit}
          name="timeLimit"
          onChange={handleChange}
          disabled={!isEditAvailable}
        >
          <option value={0} defaultChecked>
            {values.limitByPhase === "true"
              ? t("timeLimitOptionStage0")
              : t("timeLimitOptionMatch0")}
          </option>
          <option value={1000 * 60 * 60 * 1}>
            {values.limitByPhase === "true"
              ? t("timeLimitOptionStage1")
              : t("timeLimitOptionMatch1")}
          </option>
          <option value={1000 * 60 * 60 * 12}>
            {values.limitByPhase === "true"
              ? t("timeLimitOptionStage2")
              : t("timeLimitOptionMatch2")}
          </option>
          <option value={1000 * 60 * 60 * 24}>
            {values.limitByPhase === "true"
              ? t("timeLimitOptionStage3")
              : t("timeLimitOptionMatch3")}
          </option>
        </Select>
      </Label>
      <Text size="1.7rem" weight="500" margin="2rem 0 0 0">
        {t("extraPredictions")}
      </Text>
      <StyledButton
        width={isMobile ? "100%" : "50%"}
        border="1px solid yellowgreen"
        type="button"
        onClick={handleNewCustomPredictionField}
      >
        <ImPlus className="icon" size={20} />
        {t("addExtraPrediction")}
      </StyledButton>
      {values.extraPredictions &&
        values.extraPredictions.map((field, index) => {
          return (
            <InputGroup key={index}>
              <Label htmlFor={`extraPredictions[${index}].key`}>
                {t("title")}
                <Input
                  name={`extraPredictions[${index}].key`}
                  value={field.key}
                  type="text"
                  onChange={handleChange}
                />
              </Label>
              <Label htmlFor={`extraPredictions[${index}].description`}>
                {t("description")}
                <TextareaInput
                  type="text"
                  name={`extraPredictions[${index}].description`}
                  value={field.description}
                  onChange={handleChange}
                />
              </Label>
              <Label htmlFor={`extraPredictions[${index}].description`}>
                {t("extraPoints")}
                <Input
                  type="number"
                  name={`extraPredictions[${index}].score`}
                  value={field.score}
                  onChange={handleChange}
                />
              </Label>
              <Label htmlFor={`extraPredictions[${index}].timeLimit`}>
                Deadline
                <Input
                  name={`extraPredictions[${index}].timeLimit`}
                  value={parseInputDate(field.timeLimit)}
                  type="date"
                  onChange={handleChange}
                />
              </Label>
              <ImCancelCircle
                className="icon"
                size={20}
                color="tomato"
                onClick={() => handleRemoveCustomEntry(field.key)}
              />
            </InputGroup>
          );
        })}
      <Button
        type="submit"
        margin="2rem 0 0 0"
        padding="1rem"
        disabled={!isEmpty(errors) || isEmpty(values.name) || !isEditAvailable}
      >
        {t("confirmChanges")}
      </Button>
    </Form>
  );
}
