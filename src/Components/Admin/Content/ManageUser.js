import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    return (
        <>
            <div className="manage-user-container">
                <div className="title">
                    Manage User
                </div>
                <div className="users-content">
                    <div>
                        <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>Add new users</button>
                    </div>
                    <div>
                        Table users
                    </div>
                    <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} />
                </div>
            </div>
        </>
    );
}

export default ManageUser;