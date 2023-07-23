import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddPartForm ({text, addFunction}) {
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
          <Modal.Title>Modal title</Modal.Title>
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
              <label for="name">
                Name:
              </label>
              <input type="text" id="name"
                          onChange={(e) => {
                            setName(e.target.value);
                        }} />
                
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
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