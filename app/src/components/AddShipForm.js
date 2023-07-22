import ReactModal from 'react-modal';
import React, { useState } from 'react';
 
function AddShipForm() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div>
      <button onClick={setIsOpen}>Open Modal</button>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
      >
        This is the content of the modal.
      </ReactModal>
    </div>
  );
}

export default AddShipForm;