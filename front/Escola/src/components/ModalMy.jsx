import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import "../modal.css"

function ModalMy({show, handleClose, handleConfirm, title, body}){
    return(
        <Modal show={show} onHide={handleClose} animation={false} centered  >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{body}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>

                <Button variant="primary" onClick={handleConfirm}>
                    Adicionar
                </Button>
            </Modal.Footer>
    </Modal>
    )
}

export default ModalMy