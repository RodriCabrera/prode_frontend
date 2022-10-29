import { useState } from "react";

export default function useToggleModal() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((value) => !value);
  };

  return {
    showModal,
    toggleModal,
  };
}
