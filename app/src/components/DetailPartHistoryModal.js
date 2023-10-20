import { useEffect, useState } from "react";
import { getHistoryPartRecords } from "../contractCalls";
import global from "../globals";
import Modal from "react-bootstrap/Modal";
import PartHistoryTable from "./PartHistoryTable";

import Logger from "../Logger";

const logger = new Logger();
const count = 4;
//TODO: Change count

/**
 * Modal with history of changes for given part
 * @param   {text} shipName ship for the chosen part
 * @param   {text} partName part chosen to view the history of records
 * @param   {boolean} show if the modal should be displayed
 * @param   {function} setShow function for setting the show value
 * @return  modal with part's history
 */
function DetailPartHistoryModal({ shipName, partName, show, setShow }) {
  const [records, setRecords] = useState([]);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchPartRecords = async () => {
      try {
        let historyRecords = await getHistoryPartRecords(
          global.contract,
          shipName,
          partName,
          count
        );
        setRecords(historyRecords);
        logger.log(
          `All history records for part ${partName} loaded successfully.`
        );
        logger.log(records);
      } catch (error) {
        logger.error("History data cannot be loaded");
      }
    };

    fetchPartRecords();
  }, [partName]);

  return (
    <>
      <Modal
        className="modal-lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Records' history of {partName} in {shipName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <PartHistoryTable records={records} />
          </div>
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
