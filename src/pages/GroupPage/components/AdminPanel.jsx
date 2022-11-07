import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { editGroup } from "api/groups";
import ScoringInputs from "../../Groups/components/ScoringInputs";
import {
  Button,
  Input,
  Label,
  Form,
  TextareaInput,
  Select,
  Text,
  TextGroup,
} from "common/common.styles";
import { Info } from "common/Info/Info";
import { groupsSchema } from "validationSchemas/groups";

export default function AdminPanel({ groupData, updater }) {
  const { values, handleChange, errors } = useFormik({
    initialValues: {
      name: groupData.name,
      manifesto: groupData.rules.manifesto,
      scoringFull: groupData.rules.scoring.FULL,
      scoringWinner: groupData.rules.scoring.WINNER,
      scoringNone: groupData.rules.scoring.NONE,
      timeLimit: groupData.rules.timeLimit,
      limitByPhase: groupData.rules.limitByPhase ? "true" : "false",
    },
    validationSchema: groupsSchema.create,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      }).then((res) => {
        if (res.status === 200) {
          navigate(`/groups/${values.name}`);
          updater(values.name);
        }
      }),
      {
        pending: `${t('groupEditing')}`,
        success: `${t('groupEdited')}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const isEditAvailable = Date.now() < Date.parse("11-15-2022 13:00 GMT-0300");

  return (
    <Form onSubmit={handleSubmit}>
      <Info>
        {isEditAvailable
          ? t('adminEditTimeInfo1')
          : t('adminEditTimeInfo2')}
      </Info>
      <Label htmlFor="name">
        <Input
          type="text"
          placeholder={t('groupNamePH')}
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
        <TextareaInput
          type="text"
          placeholder={
            t('groupManifestPH1') +
            "\n\n" +
            t('groupManifestPH2')
          }
          name="manifesto"
          required
          value={values.manifesto}
          onChange={handleChange}
          rows="10"
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
        {t('timeLimitTitle')}
      </Text>
      <TextGroup align="center" margin=".2rem">
        <Label htmlFor="DontLimitByPhase">
          <TextGroup margin="0.2rem">
            <Text>{t('byMatch')}</Text>
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
            <Text>{t('byStage')}</Text>
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
          ? t('byMatchDetail')
          : t('byStageDetail')
        }
      </Info>
      <Label htmlFor="timeLimit">
        <Select
          value={values.timeLimit}
          name="timeLimit"
          onChange={handleChange}
          disabled={!isEditAvailable}
        >
          <option value={0} defaultChecked>
            {values.limitByPhase === "true" ? 
                t('timeLimitOptionStage0') : t('timeLimitOptionMatch0') }
          </option>
          <option value={1000 * 60 * 60 * 1}>
            {values.limitByPhase === "true" ? 
                t('timeLimitOptionStage1') : t('timeLimitOptionMatch1') }
          </option>
          <option value={1000 * 60 * 60 * 12}>
            {values.limitByPhase === "true" ? 
                t('timeLimitOptionStage2') : t('timeLimitOptionMatch2') }
          </option>
          <option value={1000 * 60 * 60 * 24}>
            {values.limitByPhase === "true" ? 
                t('timeLimitOptionStage3') : t('timeLimitOptionMatch3') }
          </option>
        </Select>
      </Label>
      <Button
        type="submit"
        disabled={!isEmpty(errors) || isEmpty(values.name) || !isEditAvailable}
      >
        {t('confirmChanges')}
      </Button>
    </Form>
  );
}
