import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUserService } from "../../../Utils/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
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

    const handleClickUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
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
                        <TableUser 
                            listUsers={listUsers} 
                            handleClickUpdate={handleClickUpdate}
                        />
                    </div>
                    <ModalCreateUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                    />
                    <ModalUpdateUser 
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                        fetchListUser={fetchListUser}
                    />
                </div>
            </div>
        </>
    );
}

export default ManageUser;