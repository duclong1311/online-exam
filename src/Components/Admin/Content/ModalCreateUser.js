import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss';
import axios from 'axios';
import { toast } from 'react-toastify';


const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    const resetModal = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setPreviewImage('');
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validateUsername = (username) => {
        return String(username)
            .toLowerCase()
            .match(/^[a-zA-Z0-9]+$/);

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitModal = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        const isValidUsername = validateUsername(username);
        if (!isValidEmail) {
            toast.error("invalid email");
            return;
        }
        if (!password) {
            toast.error("invalid password");
            return;
        }
        if (!isValidUsername) {
            toast.error("invalid username");
            return;
        }
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);
        const res = await axios.post('http://localhost:8081/api/v1/participant', data);
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            handleClose();
            resetModal();
        }

        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
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
                            {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
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

export default ModalCreateUser;