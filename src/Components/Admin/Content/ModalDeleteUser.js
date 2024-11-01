import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../Utils/apiServices';

const ModalDeleteUser = ({ show, setShow, dataDelete, fetchListUserWithPaginate, setCurrentPage }) => {
    const handleClose = () => setShow(false);

    const handleConfirm = async () => {
        const data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setShow(false)
            await fetchListUserWithPaginate(1);
            setCurrentPage(1);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };
   
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user email: <b>{dataDelete.email && dataDelete ? dataDelete.email : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;