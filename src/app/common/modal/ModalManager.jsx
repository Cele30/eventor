import { useSelector } from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";
import LoginForm from "../../../features/auth/LoginForm";

function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
  };
  const currentModal = useSelector((state) => state.modal);
  let renderedModal;

  if (currentModal.modalType !== "") {
    const { modalType } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent />;
  }

  return <span>{renderedModal}</span>;
}

export default ModalManager;
