import { Modal, Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  title,
  bodyText,
  confirmText = "Confirmar",
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <FaExclamationTriangle className="me-2" /> {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{bodyText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
