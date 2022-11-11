import styled from "@emotion/styled";
import type { TFunction } from "i18next";

export const parseDate = (date: Date, options = null) => {
  return new Date(date).toLocaleString(
    navigator.language,
    options || {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
    }
  );
};

export const parseInputDate = (date: Date) => {
  return new Date(date).toISOString().split('T')[0];
}

const FlagImg = styled.img`
  min-width: 42px;
  min-height: 28px;
`;

const FlagPlaceholder = styled.div`
  width: 48px;
  height: 28px;
  min-width: 48px;
  min-height: 28px;
  background: gray;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const getFlagUrl = (url: string, size: string) => {
  let newUrl;
  if (!url) {
    return <FlagPlaceholder>?</FlagPlaceholder>;
  } else newUrl = url?.replace("{format}", "sq").replace("{size}", size);
  return <FlagImg src={newUrl} alt="Country flag" />;
};

export interface IRules {
  limitByPhase: boolean;
  manifiesto: string;
  scoring: { FULL: number; WINNER: number; NONE: number };
  timeLimit: string;
}

export const translateDuration = (rules: IRules, t: TFunction) => {
  switch (parseInt(rules.timeLimit)) {
    case 1000 * 60 * 60 * 1:
      return ` ${rules.limitByPhase ? 
        t('timeLimitOptionStage1').toLowerCase()
        : t('timeLimitOptionMatch1').toLowerCase()}`;
    case 1000 * 60 * 60 * 12:
      return ` ${rules.limitByPhase ? 
        t('timeLimitOptionStage2').toLowerCase() 
        : t('timeLimitOptionMatch2').toLowerCase()}`;
    case 1000 * 60 * 60 * 24:
      return ` ${rules.limitByPhase ?
        t('timeLimitOptionStage3').toLowerCase() 
        : t('timeLimitOptionMatch3').toLowerCase()}`;
    case 0:
    default:
      return ` ${rules.limitByPhase ?
        t('timeLimitInfoStage0') : t('timeLimitInfoMatch0')}`;
  }
};
