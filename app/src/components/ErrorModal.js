import Modal from 'react-bootstrap/Modal';

function ErrorModal ({showError, setShowError, errorMessage}) {
    const handleClose = () => setShowError(false);

    return (
        <Modal
        show={showError}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>
                {errorMessage}
            </label>
        </Modal.Body>
        <Modal.Footer>
        <button className='Button Close' onClick={handleClose}>
            Close
        </button>
        </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal;