import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal(props) {
  const { title, content, show, onAction } = props;
  return (
    <>
      <Modal show={show} onHide={() => onAction('close')}
      backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{content}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onAction('close')}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onAction('confirm')}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ConfirmModal;
