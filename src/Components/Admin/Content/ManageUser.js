import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUserService } from "../../../Utils/apiServices";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        const res = await getAllUserService()
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

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
                        <TableUser listUsers={listUsers} />
                    </div>
                    <ModalCreateUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                    />
                </div>
            </div>
        </>
    );
}

export default ManageUser;