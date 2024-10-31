import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss';
import _ from 'lodash';
import defaultAvatar from '../../../Assets/default-avatar-icon-of-social-media-user-vector.jpg';


const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;
    const handleClose = () => setShow(false);

    const [email, setEmail] = useState(dataView?.email || "");
    const [password, setPassword] = useState(dataView?.password || "");
    const [username, setUsername] = useState(dataView?.username || "");
    const [role, setRole] = useState(dataView?.role || "USER");
    const [previewImage, setPreviewImage] = useState(defaultAvatar); // Avatar mặc định ngay từ đầu

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email || "");
            setPassword(dataView.password || "");
            setUsername(dataView.username || "");
            setRole(dataView.role || "USER");
            setPreviewImage(
                dataView.image ? `data:image/jpeg;base64,${dataView.image}` : defaultAvatar
            );
        }
    }, [dataView]);

    return (
        <>
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
                            />
                        </div>
                        <div className='col-md-12 img-fluid img-preview'>
                            {previewImage ? <img src={previewImage} alt='Avatar preview' /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;