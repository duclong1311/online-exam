import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChangePassword from './ChangePassword';
import QuizHistory from './QuizHistory';
import Profile from './Profile';

const MyProfileModal = ({ show = false, setShow = () => { } }) => {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={() => handleClose()}
                size="xl"
                backdrop="static"
                className='modal-manage-profile'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Manage User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="user-infor"  
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="user-infor" title="User Information">
                            <Profile />
                        </Tab>
                        <Tab eventKey="change-password" title="Change Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="quiz-history" title="Quiz History">
                            <QuizHistory />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyProfileModal;
