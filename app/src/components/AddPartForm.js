import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import { countries } from '../dummy_data';
import { getShipNames } from '../contractCalls';
import global from '../globals';


async function getShip() {
  const names = [];

  let ships = await getShipNames(global.contract);
  console.log(typeof ships);
  console.log(ships[0])
  await new Promise(r => setTimeout(r, 2000));
  console.log(ships);
  console.log(typeof ships.length);
  for (let i = 0; i < ships.length; i++) {
    names.push(<option value={i}>{ships[i]}</option>);
  }
  console.log(names);
  return countries.map((country) => {
    return <option value={country.dial_code}>{country.name} 
           </option>;
  });
  // return ships.map((ship, index) => {
  //   return <option key={index} value={ship}>
  //   {ship}
  // </option>;
  // });

  // return names;
}

function handleChange(e) {
  console.log("Chosen ship: ")
  console.log(e.target.value );
}

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
          <Modal.Title>Add ship's part</Modal.Title>
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
                Ship:
              </label>

              <div>
                <select
                  className="form-control"
                  aria-label="Floating label select example"
                  onChange={handleChange}>
                  <option value="choose" disabled selected="selected">
                    -- Select ship --
                  </option>
                  {getShip()}
                  </select>
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
