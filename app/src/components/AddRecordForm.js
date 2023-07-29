import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import ShipsList from './ShipsList';
import PartsList from './PartsList';

function AddRecordForm ({text, addFunction}) {
  const [name, setName] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [chosenShip, setShip] = useState("");
  const handleChangeShip = (e) => setShip(e.target.value);

  const [chosenPart, setPart] = useState("");
  const handleChangePart = (e) => setPart(e.target.value);
  console.log(chosenPart);

  return (
    <>
      <button className="Button Add" onClick={handleShow}>
        {text}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
                        onSubmit={(e) => {
                            handleClose();
                            e.preventDefault();
                            addFunction(chosenShip, chosenPart, name);
                        }}
                        id="editmodal"
                    >
              <label>
                Ship:
              </label>
              <div>
                <ShipsList value={chosenShip} handleChange={handleChangeShip} />
              </div>

              <label>
                Part:
              </label>
              <div>
                <PartsList value={chosenPart} handleChange={handleChangePart} ship={chosenShip}/>
              </div>

              <label>
                New record:
              </label>
              <input type="text" id="name"
                          onChange={(e) => {
                            setName(e.target.value);
                        }} />
                
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='Button Close' onClick={handleClose}>
            Close
          </button>
          <button
              className="Button Update"
              form="editmodal"
          >
              Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddRecordForm;
