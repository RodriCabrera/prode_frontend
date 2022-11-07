import { useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useTranslation } from "react-i18next";

import { Text } from "../common.styles";

export function GoBackButton({ text, collapse = false }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return collapse ? (
    <HiOutlineChevronLeft
      onClick={() => navigate(-1)}
      style={{ cursor: "pointer" }}
      size={20}
    />
  ) : (
    <Text
      onClick={() => navigate(-1)}
      style={{ cursor: "pointer", textDecoration: "underline" }}
    >
      {text || `< ${t('goBack')}`}
    </Text>
  );
}
