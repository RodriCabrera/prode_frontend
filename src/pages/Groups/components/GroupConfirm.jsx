import React from 'react';
import { useTranslation } from "react-i18next";
import { translateDuration } from '../../pagesHelpers';
import { Text, CardTitle, Button } from '../../../common/common.styles';

function GroupConfirm({ groupName, userGroupData, confirmText }) {
  const { t } = useTranslation();
  return (
    userGroupData && (
      <>
        <CardTitle>{groupName}</CardTitle>
        {userGroupData.manifesto && (
          <>
            <Text size="1.2rem" withBottomBorder>
              {t('rules')}
            </Text>
            <Text>{userGroupData.manifesto}</Text>
            <br />
          </>
        )}
        <Text size="1.2rem" withBottomBorder>
          {t('scoringSystem')}
        </Text>
        <div>
          <Text align="center" color="lightgreen">
            {t('resultExact')}: {userGroupData.scoring.FULL}
          </Text>
          <br />
          <Text align="center" color="yellow">
          {t('resultWinner')}: {userGroupData.scoring.WINNER}
          </Text>
          <br />
          <Text align="center" color="red">
          {t('resultNone')}: {userGroupData.scoring.NONE}
          </Text>
        </div>
        <br />
        <Text size="1.2rem" withBottomBorder>
          {t('timeLimit')}
        </Text>
        <Text>
          {t('timeLimitInfoText')}
          {translateDuration(userGroupData, t)}
        </Text>
        <br />
        <Button type="submit">{confirmText}</Button>
      </>
    )
  );
}

export default GroupConfirm;
