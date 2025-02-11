import { Modal } from 'react-responsive-modal';

function ModalMy(){
    return(
        <div>
             <Modal open={open} onClose={onCloseModal} center></Modal>
        </div>
    )
}

export default ModalMy