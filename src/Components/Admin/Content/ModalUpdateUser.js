import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../Utils/apiServices.js';
import _ from 'lodash';
import defaultAvatar from '../../../Assets/default-avatar-icon-of-social-media-user-vector.jpg';


const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUser, dataUpdate } = props;
    const handleClose = () => setShow(false);

    const validateUsername = (username) => {
        return String(username)
            .toLowerCase()
            .match(/^[a-zA-Z0-9]+$/);

    }

    const [email, setEmail] = useState(dataUpdate?.email || "");
    const [password, setPassword] = useState(dataUpdate?.password || "");
    const [username, setUsername] = useState(dataUpdate?.username || "");
    const [role, setRole] = useState(dataUpdate?.role || "USER");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(defaultAvatar); // Avatar mặc định ngay từ đầu

    useEffect(() => {
        console.log(dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email || "");
            setPassword(dataUpdate.password || "");
            setUsername(dataUpdate.username || "");
            setRole(dataUpdate.role || "USER");
            setPreviewImage(
                dataUpdate.image ? `data:image/jpeg;base64,${dataUpdate.image}` : defaultAvatar
            );
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitModal = async () => {
        //validate
        const isValidUsername = validateUsername(username);
        if (!isValidUsername) {
            toast.error("invalid username");
            return;
        }

        const data = await putUpdateUser(dataUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUser();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                disabled={true}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                disabled={true}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value={"User"}>USER</option>
                                <option value={"ADMIN"}>ADMIN</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                className="form-control"
                                type="file"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-fluid img-preview'>
                            {previewImage ? <img src={previewImage} alt='Avatar preview'/> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitModal()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;