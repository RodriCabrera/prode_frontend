import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../common.styles";
import { HiOutlineChevronLeft } from "react-icons/hi";

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
      {text || "Volver"}
    </Text>
  );
}
