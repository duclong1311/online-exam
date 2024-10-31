import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUserService } from "../../../Utils/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataView, setDataView] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
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
    const handleClickView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }
    const handleClickDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
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
                            handleClickView={handleClickView}
                            handleClickDelete={handleClickDelete}
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
                    <ModalViewUser
                        show={showModalViewUser}
                        setShow={setShowModalViewUser}
                        dataView={dataView}
                    />
                    <ModalDeleteUser
                        show={showModalDeleteUser}
                        setShow={setShowModalDeleteUser}
                        dataDelete={dataDelete}
                        fetchListUser={fetchListUser}
                    />
                </div>
            </div>
        </>
    );
}

export default ManageUser;