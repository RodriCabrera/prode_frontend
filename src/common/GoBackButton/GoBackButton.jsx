import { useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";

import { Text } from "../common.styles";

export function GoBackButton({ text, collapse = false }) {
  const navigate = useNavigate();
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
      {text || "< Volver"}
    </Text>
  );
}
