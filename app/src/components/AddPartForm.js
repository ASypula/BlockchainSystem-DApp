import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import ShipsList from './ShipsList';


function AddPartForm ({text, addFunction}) {

  const [name, setName] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [chosenShip, setShip] = useState("");
  const handleChange = (e) => setShip(e.target.value);
  console.log(chosenShip);



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
          <Modal.Title>Add ship's part</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
                        onSubmit={(e) => {
                            handleClose();
                            e.preventDefault();
                            addFunction(chosenShip, name);
    
                        }}
                        id="editmodal"
                    >
              <label>
                Ship:
              </label>
              <div>
                <ShipsList value={chosenShip} handleChange={handleChange} />
              </div>


              <label>
                New part:
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

export default AddPartForm;
