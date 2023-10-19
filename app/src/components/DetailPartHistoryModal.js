import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Logger from "../Logger";

const logger = new Logger();

/**
 * Modal with history of changes for given part
 * @param   {text} partName part chosen to view the history of records
 * @param   {boolean} show if the modal should be displayed
 * @return  modal with part's history
 */
function DetailPartHistoryModal({ partName, show, setShow }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Records' history of {partName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Some text</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="Button Close" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailPartHistoryModal;
