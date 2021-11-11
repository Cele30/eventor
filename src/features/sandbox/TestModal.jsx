import ModalWrapper from "../../app/common/modal/ModalWrapper";

function TestModal({ data }) {
  return (
    <ModalWrapper size="mini" header="Test modal">
      <div>The data is {data}</div>
    </ModalWrapper>
  );
}

export default TestModal;
