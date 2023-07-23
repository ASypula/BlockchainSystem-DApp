import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AddShipForm ({text, addFunction}) {
  const [name, setName] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Modal.Title>Add ship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
                        onSubmit={(e) => {
                            handleClose();
                            e.preventDefault();
                            addFunction(name);
                        }}
                        id="editmodal"
                    >
              <label>
                Name:
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

export default AddShipForm;
